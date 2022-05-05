var express = require('express');
var router = express.Router();
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require('../models/postsmodel');
const PostError = require('../helpers/error/PostError');
const {successPrint, errorPrint} = require('../helpers/debug/debugprinters');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/uploads");
    }, filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single("selectImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;

    sharp(fileUploaded)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(() => {
            return PostModel.create(title, description, fileUploaded, destinationOfThumbnail, fk_userId);
        })
        .then((postWasCreated) => {
            if (postWasCreated) {
                successPrint("Post was created!");
                req.flash('success', "Post was created!");
                res.redirect("/");
            } else {
                throw new PostError("Post Error: Post could not be created", "/postimage", 200);
            }
        })
        .catch((err) => {
            errorPrint("User could not be made", err);
            if (err instanceof PostError) {
                errorPrint(err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            } else {
                next(err);
            }
        });
});

router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (!searchTerm) {
            res.send({
                resultsStatus: "info", message: "No search term given!", results: []
            });
        } else {
            let results = await PostModel.search(searchTerm);
            if (results.length) {
                res.send({
                    resultsStatus: "info", message: `${results.length} results found`, results: results
                });
            } else {
                let results = await PostModel.getNRecentPosts(10);
                res.send({
                    resultsStatus: "info", message: "No results were found but here are the 10 most recent posts!", results: results
                });
            }
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;