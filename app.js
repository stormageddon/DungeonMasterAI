const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT



const app = express();
app.use(cors({
	origin: '*'
}))

app.get('/', (req, res) => {
	console.log('here')
	res.send('DungeonMasterAI')
})

app.get('/item', (req, res) => {

	console.log(`req: ${JSON.stringify(req.query)}`)

	const n = req.query.n || '1'
	const numToGen = JSON.parse(n)

	console.log(`iterate ${numToGen} times`)

	const data = new TextEncoder().encode(
		JSON.stringify({
			prompt: 'These are magical items and weapons for Dungeons And Dragons\n\n1. Runed hellish key that casts Prestidigitation\n2. Old arcane forked rod that casts Shillelagh\n3. Pulsing otherworldly buckle that casts Mending\n4. Ancient undead bowl that casts Resistance\n5. Glyphed ethereal idol that casts Mending\n6. Glowing otherworldly medallion that casts Light\n7. Darkened abyssal orb that casts Darkness\n8. Runed hellish key that casts Mage Hand\n9. Glowing otherworldly medallion that casts Light\n10. Encrusted demonic skull that casts Feeblemind or Bestow Curse (weaker version of this spell)\n11. Glowing otherworldly medallion that casts Gentle Repose\n12. Severed floating hand that cast Chill Touch\n13.  Ancient undead bowl that casts Chaos Bolt.\n14.  Glowing otherworldly medallion that casts Sleep\n15.  Faded moondial that casts Haste (related to the moon)\n16. Broken Elvish mirror that casts CloudKill\n17. Green stone obelisk that casts Sunbeam\n18.Encrusted demonic skull that casts Fear\n19.',
			temperature: 1,
			max_tokens: 20,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			stop: ["\n"]
		})
	)

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
		}
	}

	console.log(`making call to openAI:`);

	let jsonStr = ''

	openAiRequests = []

	for(let i = 0; i < numToGen; i++) {
		const tempReq = axios
			.post('https://api.openai.com/v1/engines/davinci/completions', data, config)
			
		openAiRequests[i] = tempReq;
	}

	axios.all(openAiRequests).then(axios.spread((...responses) => {
				/*console.log(`status code: ${openAIRes.statusCode}`)
				console.log(openAIRes.data.choices);
				res.send(openAIRes.data.choices.map((x) => x.text))*/



				const combined = responses.map((r) => r.data.choices.map((x) => x.text.trim()))
				console.log(combined);
				res.send([].concat.apply([], combined))

			}))
			.catch(errors => {
				console.error(errors);
			})

})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
