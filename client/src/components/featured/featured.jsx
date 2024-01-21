import "./featured.css";
// import useFetch from "../../hooks/useFetch.jsx";


const Featured = () => {

    // const {data, loading, error} = useFetch("http://localhost:8800/api/services/countByType?types=pielegnacjaRak,pielegnacjaTwarzy,pielegnacjaWlosow");
    return (
        <div className="featured">
            {/* {loading ? "Loading please wait" :  */}
            <><div className="featuredItem">
                <div className="featuredTitle">
                    <h1>Pielegnacja rąk</h1>
                    {/* <h2>{data[0]} zabiegi</h2> */}
                </div>
            </div>

            <div className="featuredItem">
                <div className="featuredTitle">
                    <h1>Pielegnacja twarzy</h1>
                    {/* <h2>{data[1]} zabiegi</h2> */}
                </div>
            </div>

            <div className="featuredItem">
                <div className="featuredTitle">
                    <h1>Pielegnacja włosów</h1>
                    {/* <h2>{data[2]} zabiegi</h2> */}
                </div>
            </div> </>
        </div>
    )
}

export default Featured;