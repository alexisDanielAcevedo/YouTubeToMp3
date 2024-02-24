// import React, { useState } from 'react';
// import axios from 'axios';


// const App = () => {
//   const [videoUrl, setVideoUrl] = useState('');
//   const [downloadInfo, setDownloadInfo] = useState(null);

//   const convertToMp3 = async () => {
//     try {
//       // Obtener el ID del video de la URL de YouTube
//       const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
//       const videoId = videoIdMatch ? videoIdMatch[1] : null;

//       if (!videoId) {
//         throw new Error('No se pudo obtener el ID del video de la URL.');
//       }

//       // Hacer solicitud a la API de YouTube Data para obtener información sobre el video
//       const youtubeApiResponse = await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
//         params: {
//           part: 'snippet',
//           id: videoId,
//           key: 'AIzaSyCxweiLYQ8XCyrg0xDUH6vc0aWUl0KHbqo', // Reemplaza con tu clave de API
//         },
//       });

//       const videoInfo = youtubeApiResponse.data.items[0].snippet;
//       const { title, thumbnails } = videoInfo;
//       const thumbnailUrl = thumbnails && thumbnails.high ? thumbnails.high.url : null;

//       // Usar la API de RapidAPI para la conversión de YouTube a MP3
//       const rapidApiResponse = await axios.get('https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/', {
//         params: {
//           url: videoUrl,
//         },
//         headers: {
//           'X-RapidAPI-Key': '9de21a0ca1mshbccc6113e4457f7p17831fjsnda675301af4e',
//           'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com',
//         },
//       });

//       const { link, length, size } = rapidApiResponse.data;

//       console.log(rapidApiResponse)

//       setDownloadInfo({
//         title,
//         link,
//         length,
//         size,
//         imageUrl: thumbnailUrl,
//       });
//     } catch (error) {
//       // console.error('Error al realizar la solicitud:', error);
      
//       setDownloadInfo(null);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="card">
      
//         <h1><i className='bx bxs-music'></i>Youtube to MP3 converterd</h1>
//         <input
//           type="text"
//           placeholder="Enter YouTube video link"
//           value={videoUrl}
//           onChange={(e) => setVideoUrl(e.target.value)}
//         />
//         <button onClick={convertToMp3}>Converted MP3</button>

//         {downloadInfo && (
//           <div className="download-info">
//             <h2>{downloadInfo.title}</h2>
//             <img src={downloadInfo.imageUrl} alt="Imagen del enlace" />
//             <a href={downloadInfo.link} download>
//                Download MP3
//             </a>
//           </div>
//         )}
//          <footer className="footer">
//           <div className="derechos">
//             © 2024 Created by - Alexis Acevedo.
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertToMp3 = async () => {
    try {
      setLoading(true); // Establecer el estado de carga a true

      // Obtener el ID del video de la URL de YouTube
      const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) {
        throw new Error('No se pudo obtener el ID del video de la URL.');
      }

      // Hacer solicitud a la API de YouTube Data para obtener información sobre el video
      const youtubeApiResponse = await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          id: videoId,
          key: 'AIzaSyCxweiLYQ8XCyrg0xDUH6vc0aWUl0KHbqo', // Reemplaza con tu clave de API
        },
      });

      const videoInfo = youtubeApiResponse.data.items[0].snippet;
      const { title, thumbnails } = videoInfo;
      const thumbnailUrl = thumbnails && thumbnails.high ? thumbnails.high.url : null;

      // Usar la API de RapidAPI para la conversión de YouTube a MP3
      const rapidApiResponse = await axios.get('https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/', {
        params: {
          url: videoUrl,
        },
        headers: {
          'X-RapidAPI-Key': '9de21a0ca1mshbccc6113e4457f7p17831fjsnda675301af4e',
          'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com',
        },
      });

      const { link, length, size } = rapidApiResponse.data;

      setDownloadInfo({
        title,
        link,
        length,
        size,
        imageUrl: thumbnailUrl,
      });
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setDownloadInfo(null);
    } finally {
      setLoading(false); // Establecer el estado de carga a false independientemente del resultado
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1><i className='bx bxs-music'></i>Youtube to MP3 converter</h1>
        <input
          type="text"
          placeholder="Enter YouTube video link"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button onClick={convertToMp3} disabled={loading}>
          {loading ? <><i className='bx bx-loader-alt bx-spin' style={{ color: '#ffffff' }}></i> Converting...</> : 'Convert to MP3'}
        </button>

        {downloadInfo && (
          <div className="download-info">
            <h2>{downloadInfo.title}</h2>
            <img src={downloadInfo.imageUrl} alt="Imagen del enlace" />
            <a href={downloadInfo.link} download>
              <i className='bx bx-download' style={{ color: '#ffffff' }}></i> Download MP3
            </a>
          </div>
        )}
        <footer className="footer">
          <div className="derechos">
            © 2024 Created by - Alexis Acevedo.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
