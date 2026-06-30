import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router=Router();

router.post("/", auth(Role.USER, Role.ADMIN), postController.createPost);
router.get("/",auth(Role.USER, Role.ADMIN),postController.getAllPosts);
router.get("/stats",postController.getPostStats);
router.get("/my-posts",postController.getMyPost);
router.get("/:postId",postController.getPostById);
router.patch("/:postId",postController.updatePost);
router.delete("/:postId",postController.deletePost);

export const postRoutes = router;