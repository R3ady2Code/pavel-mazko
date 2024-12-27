import LinkBlock from "../components/home/LinkBlock";

const Home = () => {
    const links = [
        { id: 1, title: "Покупка / каталог", type: "photo", path: "/catalog" },
        { id: 2, title: "Арт галерея", type: "video", path: "/gallery" }
    ];

    return (
        <main className="link-block__container">
            {links.map((link) => (
                <LinkBlock {...link} key={link.id} />
            ))}
        </main>
    );
};

export default Home;
