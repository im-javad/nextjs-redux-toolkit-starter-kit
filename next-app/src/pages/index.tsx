import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div>
      Go to books page {"=>"} <Link href={"/books"}>CLICK HERE</Link>
    </div>
  );
};

export default Home;
