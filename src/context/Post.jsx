/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";







export const postContext = createContext()



const PostContext = ({children}) => {
    const [allAvailablePost, setAllAvailablePost] = useState([]);


    const addAComment = (msgValue, userData, postId, )=>{
        const date = Date.now()

      const thePost = allAvailablePost.find(p => p?.POST_ID === postId)

      if(thePost){
        const commentObj = {
          COMMENT_ID: date,
          DATE_POSTED: date,
          FILE_NAME: null,
          FIRST_NAME: userData?.data?.FIRST_NAME,
          LAST_NAME: userData?.data?.LAST_NAME,
          OTHER_NAMES: userData?.data?.OTHER_NAMES,
          MESSAGE: msgValue,
          POST_ID: postId,
          THREAD_ID: null,
          USER_ID: userData?.data?.STAFF_ID
        }

        if (thePost?.COMMENTS === null ) {
          thePost.COMMENTS = [commentObj]
        }else{
          thePost?.COMMENTS?.unshift(commentObj)
        }
        setAllAvailablePost([...allAvailablePost.map(p=> p?.POST_ID === postId ? thePost: p  )])
      }
        
    }



    const likeAPost = (postId, userData, returndata, total)=>{

      let thePost = allAvailablePost.find(p => p?.POST_ID === postId)
      const liked = thePost?.LIKES?.find(l => l.USER_ID === userData?.STAFF_ID )

      if(liked){

        let data =  thePost?.LIKES?.filter(lk => lk.USER_ID !== userData?.STAFF_ID )

        thePost.LIKES = data
        thePost.TOTAL_LIKES = total

      }else{
          thePost.LIKES = [...returndata]
          thePost.TOTAL_LIKES = total
      }

      return  setAllAvailablePost([...allAvailablePost.map(p=> p?.POST_ID === postId ? thePost: p  )])

    }



    const loadMoreComments = (postId, incomingComment )=>{
      
      const thePost = allAvailablePost.find(p => p?.POST_ID === postId)

      if(thePost){ 
        thePost.COMMENTS = [...thePost.COMMENTS, ...incomingComment]
      
        setAllAvailablePost([...allAvailablePost.map(p=> p?.POST_ID === postId ? thePost: p  )])
      }
        
    }


  return (
    <postContext.Provider value={{allAvailablePost, setAllAvailablePost, addAComment, likeAPost, loadMoreComments }}>
       {children}
    </postContext.Provider>
  )
}

export default PostContext
















