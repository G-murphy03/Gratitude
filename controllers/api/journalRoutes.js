const router = require('express').Router();
const { Journal, User } = require('../../models');

// Get all journal data 
router.get('/', async (req, res) => {
    try{
        const journalData = await Journal.findAll({
            include: [{ model: User}]
        });
        res.status(200).json(journalData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Get journal data associated with user
router.get('/user', async (req, res) => {
    try{
        const UserJournalData = await Journal.findAll({
            include: [{ model: User}],
            where:{
                user_id: req.session.user_id
            }
        });
        res.status(200).json(UserJournalData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Get journal by ID
router.get('/:id', async (req,res) => {
    try {
        const journalData = await Journal.findByPk(req.params.id);

        if (!journalData) {
            res.status(500).json({message: 'No journal entry found with that id!'});
            return;
        }
        res.status(200).json(quotes);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Upload a journal entry
router.post('/', async (req, res) => {
    try {
        const journalData = await Journal.create({
            date_created: req.body.date_created,
            gratitude_entry_1: req.body.gratitude_entry_1,
            gratitude_entry_2: req.body.gratitude_entry_2,
            gratitude_entry_3: req.body.gratitude_entry_3,
            journal_entry: req.body.journal_entry,
            user_id: req.session.user_id
        });
        res.status(200).json(journalData);
    } catch(err){
        res.status(500).json(err);
    }
});

// Delete a journal entry
router.delete('/:id',  async (req, res) =>  {
    try {
        const journalData = await Journal.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!journalData) {
            res.status(404).json({ message: 'No journal entry found with that id!' });
            return;
        }
        
        res.status(200).json(journalData);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;
