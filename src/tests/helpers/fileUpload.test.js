import { fileUpload } from "../../helpers/fileUpload";

// import cloudinary from 'cloudinary';

// cloudinary.v2.config({ 
//     cloud_name: '', 
//     api_key: '', 
//     api_secret: '',
//     secure: true
// });


describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el url', async(done) => {
        
        const resp = await fetch('https://www2.minijuegosgratis.com/v3/games/thumbnails/235899_1.jpg');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');
        console.log(imageId);

        // const formData = new FormData();
        // formData.append('public_ids', imageId)
        // try {
        //     await fetch('https://<Api_Key>:<Api_Secret>@api.cloudinary.com/v1_1/<nameCloud>/resources/image/upload/', {
        //         method: 'DELETE',
        //         body: {
        //             'public-ids': [imageId]
        //         }
        //     })
        // } catch (error) {
        //     console.log(error);
        // }

        

    })

    test('debe de retornar un error', async() => {

        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);

    })

})