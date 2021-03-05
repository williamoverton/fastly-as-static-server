import React from "react";
// import ReactDOM from "react-dom";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   NavLink
// } from "react-router-dom";

interface UserImage {
    id: string
    name: string
    extension: string
    mime: string
    createdAt: string
}

interface ImagesState {
    images: UserImage[],
    isLoading: boolean
}

class Home extends React.Component<any, ImagesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            images: [],
            isLoading: true
        }
    }

    getUserFiles(): void {
        fetch(`https://fq84sg3hl1.execute-api.eu-west-2.amazonaws.com/stage/api/files/getUserFiles?userId=yeet`)
            .then((res: any) => res.json())
            .then((json: UserImage[]) => {
                this.setState({
                    images: json,
                    isLoading: false
                })
            });
    }

    componentDidMount(): void {
        this.getUserFiles()
    }

    submitFileUpload(): void {
        const api = "https://fq84sg3hl1.execute-api.eu-west-2.amazonaws.com/stage/api/files/putFile?userId=yeet";

        const input = document.querySelector('input[type="file"]') as HTMLInputElement

        if(input?.files?.length !== 1){
            return;
        }

        const data = new FormData()
        data.append('file', input.files[0])

        input.value = "";

        fetch(api, {
            method: 'POST',
            body: data
        }).then((response: any) => {

            if (!response.ok) {
                return alert(response.statusText);
            }

            this.getUserFiles()
        }).catch(e => {
            alert(e)
        })
    }

    render(): React.ReactElement {

        const thumbnailStyle: React.CSSProperties = {
            "objectFit": "cover",
            "overflow": "hidden",
            "height": "15vh"
        }

        const spinner = <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

        const fileViewer = <div className="row row-cols-2 row-cols-lg-6 row-cols-md-4 g-4">
            {this.state.images.map((image: UserImage) => (
                <div className="col" key={image.id}>
                    <div className="card h-100">
                        {image.mime && image.mime.match(/^image\/.*$/) ?
                            <div>
                                <img src={"https://fq84sg3hl1.execute-api.eu-west-2.amazonaws.com/stage/api/files/download?userId=yeet&fileId=" + image.id} style={thumbnailStyle} className="card-img-top" />
                            </div>
                            : <div>
                                <img src="https://via.placeholder.com/150" style={thumbnailStyle} className="card-img-top" />
                            </div>}
                        <div className="card-body">
                            <h4>{image.name}</h4>
                            <p>{image.createdAt}</p>
                            <a href={"https://fq84sg3hl1.execute-api.eu-west-2.amazonaws.com/stage/api/files/download?userId=yeet&fileId=" + image.id} download={image.name}>Download</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        const uploadForm = <form>
            <div className="input-group mb-3">
                <input type="file" className="form-control" name="file" />
                <button type="button" onClick={this.submitFileUpload.bind(this)} className="btn btn-primary">Submit</button>
            </div>
        </form>

        return (
            <div>

                {uploadForm}

                <h1>Files</h1>

                {this.state.isLoading ? spinner : null}

                {fileViewer}
            </div>
        );
    }
}

export default Home;