import styles from "./Comments.module.css";

export default function Comments({ comments }: { comments: any[] }) {
  return (
    <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   flexDirection: "column",
      //   marginTop: "2rem",
      // }}
      className={styles.container}
    >
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              maxWidth: "600px",
              margin: "1rem",
            }}
          >
            <li key={comment.id}>{comment.body}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: { postId: string };
}) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
  );
  const comments = await res.json();
  return { props: { comments }, revalidate: 5 };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return {
    paths: posts.map((post: any) => ({
      params: { postId: post.id.toString() },
    })),
    fallback: false,
  };
};
