//Create a new component. This component should produce some HTML
import _ from 'lodash'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyCX6AGsCKNr5AV5C9dlnftbIkyi9L396zo';
//dbounce is a method of lodash
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            videos : [],
            selectedVideo: null,
            searchedVideo: null
        };
        
        this.videoSearch('');
    }
    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos,
                selectedVideo:  videos[0] 
            });
            //ES6: when key is the same variable name I can say this.setState({videos});
        });
    }
    render (){
        const videoSearch = _.debounce((term)=>{ this.videoSearch(term) },300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos
                }/>
            </div>
        );
    }
}
//About ReactDOM
//Take this component's genereated HTML and put it on the page (in the DOM)
//That's the purpose of JSX, is to make our components a lot more clean, a lot
//more legible to see what's going on
ReactDOM.render(<App/>, document.querySelector('.container'));
//ReactDOM is used to interact with the actual DOM while React is used to create
//and manage our components.