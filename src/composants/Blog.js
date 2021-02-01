import React, { Component } from 'react'
import NvPost from './NvPost/NvPost'
import PostModale from './PostModale/PostModale'
import './Blog.css'
import axios from 'axios'
import Post from './Post/Post'

class Blog extends Component {

    state = {
        posts:[],
        selectPostId : null,
        toggle: false
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/posts") 
             .then(reponse => {
                    //console.log(typeof(reponse)); //type object
                    const articles = reponse.data.slice(0,4); /*data est la cle de la valeur title*/
                    const postAuteur = articles.map(post => { /*ajout de valeur "auteur" dans l'article */
                        return {
                            ...post, //spread operator
                            auteur:"Hugo"
                        }
                    })
                    this.setState({posts:postAuteur}) 
                })
    }

    selectId = id => {
        // console.log(id);
        this.setState({selectPostId: id}) //selection a partir de l'id
        this.setState({toggle:true})//afficher le composant Modale
    }

    toggleModale = () => {
        this.setState({toggle:false}) //cacher le composant modale 
    }

    render() {

        const posts = this.state.posts.map(post => {
           return <Post 
            key = {post.id} 
            titre = {post.title} 
            auteur = {post.auteur} 
            clicked  = {() => this.selectId(post.id)} // event cliquable a partir de l'id
           />
        })

        return (
            <div>
                <section>
                <NvPost />
                </section>
                <h2 className="text-center my-5">Choisissez un post ...</h2>
                <PostModale 
                    id={this.state.selectPostId} 
                    toggle={this.state.toggle}
                    cache={this.toggleModale}
                />
                <section className="Posts">
                    {posts} {/*affichage du const posts avec le composant <Post/>*/}
                </section>

            </div>
        );
    }
}

export default Blog;