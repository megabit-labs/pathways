import React, { Component } from 'react'

import classes from './SearchField.module.css'
import Logo from '../../assets/logo.png'
import data from './data'
import { withRouter } from 'react-router-dom'
import IosSearch from 'react-ionicons/lib/IosSearch'

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            userInput: '',
            matches: [],
            rowHighlighted: -1,
            query: '',
        }
    }

    componentDidMount() {
        this.setState({
            words: data.words,
        })
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

    searchResultRenderHandler = () => {
        this.props.history.push(`/results/search=${this.state.query}`)
    }

    render() {
        return (
            <div>
                <div className={classes.logo}>
                    <img src={Logo} className={classes.logoimage} />
                </div>
                <div className={classes.search}>
                    <div className={classes.searchBar}>
                        <IosSearch fontSize='25px' color='#969696' />
                        <input
                            className={classes.inputField}
                            type='text'
                            value={this.state.userInput}
                            onInput={(e) => this.handleUserInput(e)}
                            onKeyDownCapture={(e) => this.handleKeyPress(e)}
                            onKeyDown={(event) =>
                                event.keyCode == 13
                                    ? this.searchResultRenderHandler()
                                    : null
                            }
                            onChange={(e) =>
                                this.setState({ query: e.target.value })
                            }
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
export default withRouter(SearchField)
