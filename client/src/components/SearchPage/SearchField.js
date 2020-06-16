import React, {Component} from 'react';
import './SearchField.css'
import Logo from '../assets/logo.png'
import Search from '../assets/search.png';
import Mic from '../assets/mic.png'
import Suggestion from "./data";
import data from './data'
class SearchField extends Component{



    constructor(props) {
        super(props);
        this.state = {
            words: [],
            userInput: '',
            matches: [],
            rowHighlighted: -1
        }
    }

    componentDidMount(){
        this.setState({
            words: data.words
        })
    }

    handleUserInput(e) {
        let input = e.target.value;
        let {words} = this.state;
        let matches = [];

        if (input){
            for (let i = 0; i < words.length; i++){
                if (words[i].startsWith(input) && matches.length < 10){
                    matches.push(words[i])
                }
            }
        }

        this.setState({
            userInput: input,
            matches: matches
        })
    }

    selectAutocomplete(i){
        this.setState({
            userInput: this.state.matches[i],
            matches: []
        })
    }

    handleKeyPress(e){
        let {rowHighlighted} = this.state;
        if (e.key === 'ArrowUp' && rowHighlighted > -1){
            rowHighlighted--;
        }
        if (e.key === 'ArrowDown' && rowHighlighted < this.state.matches.length - 1){
            rowHighlighted++;
        }
        if (e.key === 'Enter'){
            return this.selectAutocomplete(rowHighlighted);
        }

        this.setState({rowHighlighted});
    }

    setRowHighlighted(i){
        this.setState({
            rowHighlighted: i
        })
    }


    render() {
        return(
            <div>
                    <div className="logo">
                        <img src={Logo} className="logo-img" />
                    </div>
                    <div className="search">

                      <div>
                          <img src={Search} className="srch" />
                          <input type="text" value={this.state.userInput} onChange={(e) => this.handleUserInput(e)} onKeyDown={(e) => this.handleKeyPress(e)} />
                          <img src={Mic} className="mic" />
                      </div>
                        <div className="newclass">
                            <div className='autocomplete_suggestions'>
                                {
                                    this.state.matches.map( (item, i) => {
                                        let background = this.state.rowHighlighted === i ? '#ccc' : '#fff';
                                        return <p key={i} className='autocomplete_suggestions_item'
                                                  onClick={() => this.selectAutocomplete(i) } style={{background: background}}
                                                  onMouseOver={() => this.setRowHighlighted(i)} >{item}</p>
                                    })
                                }
                            </div>
                        </div>

                    </div>


            </div>
        );
    };
};
export default SearchField;


