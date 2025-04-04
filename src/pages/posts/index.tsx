import { GetStaticProps } from "next";
import Link from "next/link";

export default function Posts({ posts }: { posts: any[] }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <h1>Posts: </h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {posts.map((postItem) => (
          <li key={postItem.id}>
            <div
              style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                margin: "1rem",
                textAlign: "center",
              }}
            >
              <Link href={`/posts/${postItem.id}`}>{postItem.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return {
    props: { posts },
    revalidate: 5,
  };
};
