import NextHead from "next/head";

interface Props {
    title: string;
};

const Head = ({ title }: Props) => {
    return (
        <NextHead>
            <title> {title} </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
            <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"/>
            <link rel="shortcut icon" href=""/>
        </NextHead>
    );
};

export default Head;