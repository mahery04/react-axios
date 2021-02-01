import React, { Component } from 'react'
import './PostModale.css'
import axios from 'axios'

class PostModale extends Component {

    state = {
        loadedPost:null
    }

    componentDidUpdate(){
        // console.log("UPDATED");
        if (this.props.id) {  //si id est null
            //condition pour eviter une boucle infinie qu'on consulte dans network(inspect)
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost !== this.props.id)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(reponse => {
                    // console.log(reponse);
                    this.setState({
                        loadedPost:reponse.data
                    })
                })
            }
        }
    }


    render () {

        return (
            //conditionnal rendering,si loadedPost is not null aficher
            this.state.loadedPost && this.props.toggle ? 
                <div className="PostComplet">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
            
                    <button 
                    className="btn btn-danger my-3 btnPost"
                    onClick={this.props.cache}
                    >Fermer</button>
                
                </div>

                : null //sinon c'est null
        )
    }
}

export default PostModale;
