import type { NextApiRequest, NextApiResponse } from 'next'
import cohere from 'cohere-ai';

type Data = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getText( req, res );
            
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
    
}

const getText = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    cohere.init('qCCqPcRJyskarlBDzaWtfP6Ulq7e1fsWhuNGnEaY'); // This is your trial API key
    
    const response = await cohere.generate({
        model: 'command-xlarge-nightly',
        prompt: '{generate 5 names}',
        max_tokens: 300,
        temperature: 0.9,
        k: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
    });
    console.log(`Prediction: ${response.body.generations[0].text}`);
    

    res.status(200).json( { message: 'hola' } );

}