import React from "react";
import Header from "../Includes/Header";
import Footer from "../Includes/Footer";

const Front = ({title, children}) => {
    document.title = title;
    return (
        <React.Fragment>
            <main className="body">
                <section className="content">
                    <Header />
                    <section className="container">
                        {children}
                    </section>
                </section>
                <Footer />
            </main>
        </React.Fragment>
    );
}

export default Front;