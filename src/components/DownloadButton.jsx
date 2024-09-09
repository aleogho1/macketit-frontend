/* eslint-disable react/prop-types */

// function DownloadImageButton({ object }) {
//   const downloadImage = () => {
//     const mediaPath = object.task.media_path
//     const anchor = document.createElement('a')
//     anchor.href = mediaPath
//     anchor.target = '_blank'
//     anchor.download = 'image.jpg' // You can set the desired filename here

//     document.body.appendChild(anchor)
//     anchor.click()
//     document.body.removeChild(anchor)
//   }

//   return <button onClick={downloadImage}>Download Image</button>
// }

function DownloadImageButton({ imageUrl }) {
  const downloadImage = () => {
    const anchor = document.createElement('a')
    anchor.href = imageUrl
    anchor.download = 'image.jpg' // You can set the desired filename here

    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  return (
    <div>
      <button onClick={downloadImage}>Download Media</button>
    </div>
  )
}

export default DownloadImageButton
