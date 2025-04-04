import Link from "next/link";

export default function Post({ post }: { post: any }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2rem",
      }}
    >
      <h1>Post Details: </h1>
      <div
        style={{
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxWidth: "600px",
          margin: "1rem",
        }}
      >
        <h1>{post.title}</h1>
        <p>{post.body}</p>

        <p
          style={{
            color: "blue",
            textDecoration: "underline",
            marginTop: "1rem",
          }}
        >
          <Link href={`/posts/${post.id}/comments`}>Show Comments</Link>
        </p>
      </div>
    </div>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: { postId: string };
}) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await res.json();
  return {
    props: { post },
  };
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
