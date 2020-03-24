import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface ChirpsProps { };

export interface Chirp {
    id: number,
    author: string,
    text: string
};


const Chirps: React.SFC<ChirpsProps> = (props) => {

    const [chirps, setChirps] = useState<Chirp[]>([]);
    const [newAuthor, setAuthor] = useState<string>('');
    const [newText, setText] = useState<string>('');

    const getChirps = async () => {
        let r = await fetch('/chirps');
        let data = await r.json();
        let arr: Chirp[] = [];
        for (var i in data) {
            if (i !== "nextid") {
                arr.push({ id: parseInt(i), author: data[i].user, text: data[i].text });
            }
        }
        setChirps(arr);
    }


    useEffect(() => {
        getChirps();
    }, []);

    const addNewChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        fetch('/chirps', {
            method: 'POST',
            body: JSON.stringify({ user: newAuthor, text: newText }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                getChirps();
                setAuthor('');
                setText('');
            });
    };


    return (
        <div className="container-fluid">
            <h1 className="m-3">Chirper</h1>

            <div className="list-group">
                {chirps.map(chirp => (
                    <div key={chirp.id} className="d-flex align-items-center justify-content-between list-group-item list-group-item-action">
                        <div>
                            <h5 className="mb-1">{chirp.author}</h5>
                            <p className="mb-1">{chirp.text}</p>
                        </div>
                        <div>
                            <Link to={`/${chirp.id}/admin`} className="btn btn-info shadow-sm">Admin Options</Link>
                        </div>
                        
                    </div>
                ))}
            </div>



            <div className="my-3 py-3 container-fluid bg-light border rounded">
                <form>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" id="author" value={newAuthor}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                        />
                        <label htmlFor="commentText">Insert comment here</label>
                        <textarea className="form-control" rows={3} id="commentText" value={newText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="btn btn-outline-success" id="addButton"
                        onClick={addNewChirp}>
                        Add Comment!
                </button>
                </form>
            </div>
        </div>


    );
}

export default Chirps;