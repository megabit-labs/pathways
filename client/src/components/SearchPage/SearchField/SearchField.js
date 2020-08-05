import React, { Component } from 'react'
import classes from './SearchField.module.css'
import Logo from '../../assets/logo.png'
import Search from '../../assets/search.png'
import data from './data'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            userInput: '',
            matches: [],
            rowHighlighted: -1,
            results: [],
        }
        this.submit = this.submit.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
    }

    componentDidMount() {
        this.setState({
            words: data.words,
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { history } = this.props
        if (prevState.results !== this.state.results) {
            history.push('/results')
        }
    }

    handleUserInput = (e) => {
        let input = e.target.value
        let { words } = this.state
        let matches = []

        if (input) {
            words.forEach((word) => {
                if (word.startsWith(input) && matches.length < 10) {
                    matches.push([word])
                }
            })
        }

        this.setState({
            userInput: input,
            matches: matches,
            [e.target.name]: e.target.value,
        })
    }

    selectAutocomplete = (i) => {
        this.setState({
            userInput: this.state.matches[i],
            matches: [],
        })
    }

    handleKeyPress = (e) => {
        let { rowHighlighted } = this.state
        if (e.key === 'ArrowUp' && rowHighlighted > -1) {
            rowHighlighted--
        }
        if (
            e.key === 'ArrowDown' &&
            rowHighlighted < this.state.matches.length - 1
        ) {
            rowHighlighted++
        }
        if (e.key === 'Enter') {
            return this.selectAutocomplete(rowHighlighted)
        }

        this.setState({ rowHighlighted })
    }

    setRowHighlighted = (i) => {
        this.setState({
            rowHighlighted: i,
        })
    }

    submit = (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        let url = `https://api.themoviedb.org/3/search/tv?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&query=${userInput}&page=1`;
        axios
          .get(url)
          .then(({ data }) => {
            // const info = response.data.results;
            console.log(data);
            this.setState({
              results: data,
            });
          })
          .catch((error) => console.log(error));
      };

    render() {
        return (
            <div>
                <div className={classes.logo}>
                    <img src={Logo} className={classes.logoimage} />
                </div>
                <div className={classes.search}>
                    <div>
                        <img src={Search} onClick={this.submit} className={classes.srch} />
                        <input
                            type='text'
                            name='term'
                            value={this.state.userInput}
                            onChange={(e) => this.handleUserInput(e)}
                            onKeyDown={(e) => this.handleKeyPress(e)}
                        />
                    </div>
                    <div className={classes.newclass}>
                        <div className={classes.autocomplete_suggestions}>
                            {this.state.matches.map((item, i) => {
                                let background =
                                    this.state.rowHighlighted === i
                                        ? '#ccc'
                                        : '#fff'
                                return (
                                    <p
                                        key={i}
                                        className={
                                            classes.autocomplete_suggestions_item
                                        }
                                        onClick={() =>
                                            this.selectAutocomplete(i)
                                        }
                                        style={{ background: background }}
                                        onMouseOver={() =>
                                            this.setRowHighlighted(i)
                                        }
                                    >
                                        {item}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchField
