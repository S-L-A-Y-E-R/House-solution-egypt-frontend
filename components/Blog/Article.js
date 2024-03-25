import { useTranslation } from "react-i18next";
import { BLOG_IMAGE_BASE_URL } from "@/config";
import Link from "next/link";
import { useRouter } from "next/router";
import style from '@/styles/BlogIndex.module.css';



const Article = (props) => {
    const { t, i18n } = useTranslation();
    const { post, isArabic } = props;
    const router = useRouter();

    return (
        <div className={`${style.post}`} key={post._id} >
            <div className={`${style.head}`}>
                <p>{t('pages.blog.topic')}: </p>
                <a href={`//topics/${post.topic.replaceAll(' ', '-').replaceAll('?', '_qm_')}`} alt={post.topic}>{post.topic} </a>
            </div>
            <div className={`${style.center}`} onClick={() => {
                router.push(
                    {
                        pathname: `/articles/${post.title.replaceAll(' ', '-').replaceAll('?', '_qm_')}`,
                        query: { bid: post._id, title: post.title }
                    },
                    `/articles/${post.title.replaceAll(' ', '-').replaceAll('?', '_qm_')}`
                );
            }}>
                <div className={`${style.postCenter} ${style.image}`}>
                    <img loading="lazy" placeholder='blur' className={`${style.postImage}`} src={BLOG_IMAGE_BASE_URL + post.image} alt={post.title}
                        title="image"
                    />

                </div>
                <div className={`${style.postCenter} ${style.title}`}>
                    <h3 className={`${style.postTitle}`}>
                        {post.title}
                    </h3>
                </div>

                <div className={`${style.postCenter} ${style.btn}`}>
                    <Link className={`${style.readMoreBtn}`}
                        rel="noopener noreferrer"
                        href={{
                            pathname: `/articles/${post.title.replaceAll('-', '_da_').replaceAll('?', '_qm_').replaceAll(' ', '-')}`,
                            query: { bid: post._id }
                        }}
                        as={`/articles/${post.title.replaceAll(' ', '-').replaceAll('?', '_qm_')}`}
                        data-ur1313m3t="true">
                        <span>{t('pages.blog.read_more')}</span>
                        <span className={`${style.symbole} ${isArabic ? style.symboleAr : ''}`}>
                            ⮑
                        </span>
                    </Link>
                </div>
            </div>
            <div className={`${style.footer}`}>
                <div className={`${style.postFooter} ${style.info}`}>
                    <div className={`${style.postInfo} ${style.author}`}>
                        <p className={`${style.postAuthor}`} data-by={t('pages.blog.authby')}>
                            {post.writter}
                        </p>
                        <p className={`${style.postDate}`}>
                            {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }).format(new Date(post?.createdAt))}
                        </p>
                    </div>
                    <div className={`${style.postInfo} ${style.read}`}>
                        {post.readTime + ' ' + t('pages.blog.min') + ' ' + t('pages.blog.read')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
