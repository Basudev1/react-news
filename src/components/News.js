import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super()
        console.log("Hello From Constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        console.log("cdm");
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=952e264e7f764b3c856ac2d86ecf8c50&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })

    }
    handlePrevClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=952e264e7f764b3c856ac2d86ecf8c50&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })

    }
    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=952e264e7f764b3c856ac2d86ecf8c50&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
    render() {
        console.log("Hello from render");
        return (
            <div className="container my-4">
                <h2>NewsBuzz - Top News Stories Across The World</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrevClick}>&#8592; Prev</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} className="btn btn-primary" onClick={this.handleNextClick}>Next &#8594;</button>
                </div>
            </div>
        )
    }
}

export default News
