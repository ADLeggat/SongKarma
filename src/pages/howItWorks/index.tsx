import Layout from "~/components/Layout";
import FAQ from "~/components/HowItWorks/FAQ";

const index = () => {
    return (
        <Layout path="howItWorks" title="How it Works">
            <div className="mt-5 mx-5">
                <FAQ/>
            </div>
        </Layout>
    );
}

export default index;