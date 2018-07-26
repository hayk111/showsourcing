

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());




const stream = require('getstream');
const client = stream.connect('mvufdhfnfz83', 'rxhfeg48egugsu3hsbx3my2j6uha8cdt9u56a3v3sn4rbduvm74q5z8y8hq55u26', '39385');

app.get('/:id', (req, res) => {
	const token = client.getReadOnlyToken('team', req.params.id);
	res.json({ token });
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))