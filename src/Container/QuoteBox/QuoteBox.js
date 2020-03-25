import React, {Component} from 'react';
import axios from 'axios';

import './QuoteBox.css';
import Twitter from '../../assets/svg/twitter';
import Tumblr from '../../assets/svg/tumblr';
 
class QuoteBox extends Component {
    state = {
        randomQuote: '',
        randomAuthor: '',
        colorsPrimary: ['purple', 'indigo', '#9966ff', 'green', 'lime', 'Fuchsia'],
        colorsSecondary: ['#99ff99', 'pink', 'blue', 'cyan', 'teal', 'yellow', 'orangered'],
        colorOne: '',
        colorTwo: '',
    }
 componentDidMount() {
    this.randomizer();
    this.colorRandomizer();
 }

 randomQuoteHandler = () => {
    this.randomizer();
    this.colorRandomizer();
 }

 randomizer = () => {
    // let random = Math.floor(Math.random() * this.state.list.length);

    // this.setState({randomQuote: this.state.list[random].quote, randomAuthor: this.state.list[random].author});
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(result => {
        const len = result.data.quotes.length;
        let random = Math.floor(Math.random() * len);

        this.setState({randomQuote: result.data.quotes[random].quote, 
            randomAuthor: result.data.quotes[random].author});
    })
    .catch(error => {
        console.log(error);
    })
 }

 colorRandomizer = () => {
    let randomOne = Math.floor(Math.random() * this.state.colorsPrimary.length);
    let randomTwo = Math.floor(Math.random() * this.state.colorsSecondary.length);

    this.setState({colorOne: this.state.colorsPrimary[randomOne], colorTwo: this.state.colorsSecondary[randomTwo]});
 }
    
    render() {
        return (
            <div id="quote-box" style={{background: `linear-gradient(20deg, ${this.state.colorOne}, ${this.state.colorTwo})` }}>
                <div id="space">
                    <p id="text" >{this.state.randomQuote} </p>
                    <section id="author">– {this.state.randomAuthor}</section>
                </div>
                <section id="lower-section">
                    <a rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=&text=` + encodeURIComponent('"' + this.state.randomQuote + '" ' + this.state.randomAuthor)} id="tweet-quote" title="Tweet this post" target="_blank"><Twitter fill={this.state.colorTwo} width={'2.5rem'} id="twitter" /></a>
                    <a rel="noopener noreferrer" href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=` + encodeURIComponent(this.state.randomAuthor) +'&content= ' + encodeURIComponent(this.state.randomQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'} title="Post on Tumblr" target="_blank"><Tumblr fill={this.state.colorTwo} width={'2.5rem'} id="tumblr" /></a>
                    <button id="new-quote" onClick={this.randomQuoteHandler} style={{background: `linear-gradient(20deg, ${this.state.colorOne}, ${this.state.colorTwo})` }} >New Quote</button>
                </section>
            </div>
        );
    }
}

export default QuoteBox;