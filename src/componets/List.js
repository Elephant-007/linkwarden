import "../styles/List.css";
import LazyLoad from "react-lazyload";
import ViewArchived from "./ViewArchived";
import EditItem from "./EditItem";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoResults from "./NoResults";

const List = ({ data, tags, collections, reFetch, SetLoader, lightMode }) => {
  const [editBox, setEditBox] = useState(false),
    [editIndex, setEditIndex] = useState(0),
    [numberOfResults, setNumberOfResults] = useState(0);

  function edit(index) {
    setEditBox(true);
    setEditIndex(index);
  }

  function exitEditing() {
    setEditBox(false);
  }

  useEffect(() => {
    setNumberOfResults(data.length);
  }, [data]);

  return (
    <div className="list">
      {numberOfResults > 0 ? (
        <p className="results">{numberOfResults} Bookmarks found.</p>
      ) : null}

      {numberOfResults === 0 ? <NoResults /> : null}

      {editBox ? (
        <EditItem
          lightMode={lightMode}
          tags={() => tags}
          collections={() => collections}
          onExit={exitEditing}
          SetLoader={SetLoader}
          reFetch={reFetch}
          item={data[editIndex]}
        />
      ) : null}
      
      {/* eslint-disable-next-line */}
      {data.map((e, i, array) => {
        try {
          const url = new URL(e.link);
          const favicon =
            "https://www.google.com/s2/favicons?domain=" + url.hostname;
          return (
            <LazyLoad key={i} height={200} offset={200}>
              <div className="list-row">
                <div className="img-content-grp">
                  <img alt="" src={favicon} />
                  <div className="list-entity-content">
                    <div className="row-name">
                      <span className="num">{i + 1}.</span>
                      {e.name}
                      <a
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                        href={e.link}
                      >
                        ({url.hostname})
                      </a>
                    </div>
                    <div className="title">{e.title}</div>
                    <div className="list-collection-label">
                      <Link to={`/collections/${e.collection}`}>
                        {e.collection}
                      </Link>
                    </div>
                    <div className="tags">
                      {e.tag.map((e, i) => {
                        const tagPath = `/tags/${e}`;
                        return (
                          <Link to={tagPath} key={i}>
                            {e}
                          </Link>
                        );
                      })}
                    </div>
                    <div className="date">
                      {new Date(e.date).toDateString()}
                    </div>
                  </div>
                </div>
                <div className="etc">
                  <ViewArchived className="view-archived" id={e._id} />
                  <button className="btn edit-btn" onClick={() => edit(i)}>
                    &#xf303;
                  </button>
                </div>
              </div>
            </LazyLoad>
          );
        } catch (e) {
          console.log(e);
        }
      })}
    </div>
  );
};

export default List;
