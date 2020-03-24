import * as React from 'react';
import { useState, useEffect } from 'react';
import { Chirp } from './Chirps';
import { RouteComponentProps } from 'react-router';

export interface DetailsProps extends RouteComponentProps<{ id: string }> { }

const Details: React.SFC<DetailsProps> = ({ history, match: { params: { id } } }) => {


    const [author, setAuthor] = useState<string>('');
    const [text, setText] = useState<string>('');

    const getChirp = async () => {
        let r = await fetch(`/chirps/${id}`);
        let post = await r.json();
        setAuthor(post.user);
        setText(post.text);
    }

    useEffect(() => { getChirp(); }, [id]);

    const editChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        fetch(`/chirps/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ user: author, text: text }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => history.goBack());
    };

    const deleteChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        fetch(`/chirps/${id}`, {
            method: 'DELETE'
        })
            .then(() => history.goBack());
    };

    return (
        <div className="container my-5">
            <div className="mx-auto w-50 p-3 bg-light border shadow-lg rounded">
                <form>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" defaultValue={author}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                        />
                        <label htmlFor="commentText">Insert comment here</label>
                        <textarea className="form-control" rows={3} defaultValue={text}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="btn btn-outline-info mr-1"
                        onClick={editChirp}>
                        Edit Chirp
                    </button>
                    <button className="btn btn-outline-danger"
                        onClick={deleteChirp}>
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Details;