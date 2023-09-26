import { useState } from "react";
import axios from 'axios';

function Search(props) {
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);

    const getPages = () => {
        const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&origin=*`;
        axios.get(url)
            .then((res) => {
                console.log(res.data);
                let updatedData = []
                for (let i = 0; i < 10; i++) {
                    updatedData.push(
                        {
                            'id': i,
                            'title': res.data[1][i],
                            'url': res.data[3][i],
                        }
                    )
                }

                setData(updatedData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div>
                <input
                    onChange={(e) => { setInput(e.target.value); }}
                    onMouseLeave={(e) => {
                        e.preventDefault();
                        getPages();
                    }}
                >
                </input>
                <button onClick={props.openSearch}>X</button>
            </div>
            <div>
                {
                    data.map((value) => {
                        return (
                            <div key={value.id}>
                                <h1><a href={value.url}>{value.title}</a></h1>
                            </div>
                        )
                    })

                }
            </div>
        </>
    )
}

export default Search