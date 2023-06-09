import styles from "./Post.module.scss";
import { FC, useEffect, useMemo, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ClassIcon from "@mui/icons-material/Class";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { useFormatDate } from "../../hooks/useFormatDate";
import { Link } from "react-router-dom";
import { PostType } from "../../store/slice/posts/postsTypes";
import { CategoryEnum } from "../../utils/constants/categoryItem";
import { useIPInfo } from "../../hooks/useIpInfo";
import { useAppDispatch } from "../../store/store";
import { fetchDeleteLike, fetchLikedPost } from "../../store/slice/posts/postsThunk";
import { deleteLikePost, likedPost } from "../../store/slice/posts/postsSlice";
import { CircularProgress } from "@mui/material";

interface IPost {
  post: PostType;
}

export const Post: FC<IPost> = ({ post }) => {
  const postData = useFormatDate(post);

  const postTime = useMemo(() => {
    return calculateTimeElapsed(new Date(post.date));
  }, []);

  const setCategoryName = (categoryValue: string) => {
    if (categoryValue === CategoryEnum.it_news) {
      return "Новости ИТ";
    }
    if (categoryValue === CategoryEnum.ai) {
      return "AI";
    }
    if (categoryValue === CategoryEnum.useful_services) {
      return "Полезные ресуры";
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postImage}>
          <Link to={`/posts/${post.id}`}>
            <img src={post.imageUrl} alt={post.title} />
          </Link>
        </div>

        <article className={styles.postArticle}>
          <time className={styles.postDate}>
            Опубликовано: {postData}
            <span>{postTime}</span>
          </time>
          <Link to={`/posts/${post.id}`}>
            <div className={styles.postBody}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <div className={styles.descroptionContainer}>
                <p className={styles.postDescription}>{post.description}</p>
              </div>
            </div>
          </Link>
          <div className={styles.postDataContainer}>
            <div className={styles.postData}>
              <div className={styles.views}>
                <RemoveRedEyeIcon />
                {post.views}
              </div>
              <div className={styles.commnets}>
                <ChatBubbleOutlineIcon />
                {post.comments.length}
              </div>
              <div className={styles.category}>
                <ClassIcon />
                {setCategoryName(post.category)}
              </div>
            </div>

            <div className={styles.dataActions}>
              <div className={styles.likedCount}>{post.likes.length}</div>
              <FavoriteIcon />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
