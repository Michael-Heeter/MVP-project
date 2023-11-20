const $player = $('#player')
const $campaign = $('#campaign')
const $thewhole = $('#the-whole')
let someName = '';
let someChar;

const connectionPoint = 'API.js'

function clear(){
    const campaignlist = $('#campaignlist'); campaignlist.remove()
    const playerlist = $(`#playerlist`); playerlist.remove()
    const $main = $(`#undercarriage`); $main.remove()
    const characterList = $(`#characterlist`); characterList.remove()
    const clearCampaign = $(`#clearCampaign`); clearCampaign.remove()
    const createCampaign = $('#createCampaign'); createCampaign.remove()
    const deletechar = $('#deletechar'); deletechar.remove()
    const charactersheet = $('#charactersheet'); charactersheet.remove()
    const createnewcharacter = $('#createnewcharacter'); createnewcharacter.remove()
    const createChar = $('#createChar'); createChar.remove()
    const patchcharacter = $('#patchcharacter'); patchcharacter.remove()
}

$player.on('click', function() {
    clear()
    
    const createPlayerlist = document.createElement('div')
    createPlayerlist.setAttribute('id', 'playerlist')
    
    const url = connectionPoint + '/api/player'
    $.ajax({
        url,
        type: 'GET',
        success: function(data) {
            data.forEach(player => {
                const playerDiv = document.createElement('div')
                playerDiv.classList.add(`${player.id}`)
                playerDiv.classList.add(`playerListName`)
                playerDiv.textContent = player.name;
                createPlayerlist.appendChild(playerDiv)
            });
            document.body.appendChild(createPlayerlist)
            },
            error: function (xhr, status, error) {
                if(status === 404){
                    playerlist.append(`<p>Couldn't find players</p>`)
                }
            }
        })
    })

$(document.body).on('click', '.playerListName', function(event) {
    const elementClass = $(this).attr('class')
    const classes = elementClass.split(' ')
    someName = classes[0]
    console.log(someName)
    getCharacters(classes[0])
})

function getCharacters(player_id) {
    const url = connectionPoint + `/api/player/${player_id}`
    // Assuming playerlist is defined and needs to be removed before populating new character info
    clear()

    const characterList = document.createElement('div')
    characterList.setAttribute('id', 'characterlist')

    $.ajax({
        url,
        type: 'GET',
        success: function(data) {
            data.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.classList.add(`${character.id}`);
                characterDiv.classList.add(`characterList-item`);
                characterDiv.textContent = `Name: ${character.name}, Class: ${character.class}, Race: ${character.race}`;
                characterList.appendChild(characterDiv);
                
                const characterBtns = document.createElement('div')
                characterBtns.classList.add('characterBtns')

                const characterViewBtn = document.createElement('button')
                characterViewBtn.classList.add(character.id)
                characterViewBtn.classList.add('characterViewBtn')
                characterViewBtn.classList.add('charBtn')
                characterViewBtn.textContent = 'view'
                
                const characterEditBtn = document.createElement('button')
                characterEditBtn.classList.add(character.id)
                characterEditBtn.classList.add('characterEditBtn')
                characterEditBtn.classList.add('charBtn')
                characterEditBtn.textContent = 'edit'
                
                const characterDeleteBtn = document.createElement('button')
                characterDeleteBtn.classList.add(character.id)
                characterDeleteBtn.classList.add('characterDeleteBtn')
                characterDeleteBtn.classList.add('charBtn')
                characterDeleteBtn.textContent = 'delete'

                characterDiv.appendChild(characterBtns)
                characterBtns.appendChild(characterViewBtn)
                characterBtns.appendChild(characterEditBtn)
                characterBtns.appendChild(characterDeleteBtn)

            });
            // Assuming characterList needs to be appended to the body
            document.body.appendChild(characterList);
            
            const createCharacterDiv = document.createElement('div')
            createCharacterDiv.setAttribute('id','createCharacterDiv')
            createCharacterDiv.textContent = 'Create Character'
            characterList.prepend(createCharacterDiv)

            const characterCreate = document.createElement('button')
            characterCreate.classList.add('characterCreate')
            characterCreate.textContent = '+'
            createCharacterDiv.appendChild(characterCreate)
        },
        error: function(xhr, status, error) {
            if (status === 404) {
                // Assuming playerlist needs to be used here for error handling
                playerlist.append(`<p>Couldn't find players</p>`);
            }
        }
    });
}

$campaign.on('click', function() {
    clear()

    const createcampaignlist = document.createElement('div')
    createcampaignlist.setAttribute('id', 'campaignlist')

    const url = connectionPoint + '/api/campaign'
    $.ajax({
        url,
        type: 'GET',
        success: function(data) {
            data.forEach(campaign => {
                const campaignDiv = document.createElement('div')
                campaignDiv.classList.add(`${campaign.id}`)
                campaignDiv.classList.add(`campaignListName`)
                campaignDiv.textContent = campaign.name;
                createcampaignlist.appendChild(campaignDiv)
            });
            document.body.appendChild(createcampaignlist)
            
            const createCampaignDiv = document.createElement('div')
            createCampaignDiv.setAttribute('id','createCampaignDiv')
            createCampaignDiv.textContent = 'Create Campaign'
            campaignlist.prepend(createCampaignDiv)

            const createCampaignBtn = document.createElement('button')
            createCampaignBtn.setAttribute('id','createCampaignBtn')
            createCampaignBtn.textContent = '+'
            createCampaignDiv.appendChild(createCampaignBtn)
            },
            error: function (xhr, status, error) {
                if(status === 404){
                    campaignlist.append(`<p>Couldn't find campaigns</p>`)
                }
            }
        })
    })


function getPlayers(campaign_id) {
    const url = connectionPoint + `/api/player/${campaign_id}`
    // Assuming playerlist is defined and needs to be removed before populating new character info
    clear()

    const characterList = document.createElement('div')
    characterList.setAttribute('id', 'characterlist')
    console.log(campaign_id)

    $.ajax({
        url,
        type: 'GET',
        success: function(data) {
            data.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.classList.add(`${character.id}`);
                characterDiv.classList.add(`P&CList-item`);
                characterDiv.textContent = `Player: ${character.name}, Class: ${character.class}, Race: ${character.race}`;
                characterList.appendChild(characterDiv);
                
                const characterBtns = document.createElement('div')
                characterBtns.classList.add('characterBtns')

                const characterViewBtn = document.createElement('button')
                characterViewBtn.classList.add(character.id)
                characterViewBtn.classList.add('characterViewBtn')
                characterViewBtn.textContent = 'view'

                characterDiv.appendChild(characterBtns)
                characterBtns.appendChild(characterViewBtn)    
            });
            // Assuming characterList needs to be appended to the body
            document.body.appendChild(characterList);
        },
        error: function(xhr, status, error) {
            if (status === 404) {
                // Assuming playerlist needs to be used here for error handling
                playerlist.append(`<p>Couldn't find players</p>`);
            }
        }
    });
}

$(document.body).on('click', '.campaignListName', function(event) {
    const elementClass = $(this).attr('class')
    const classes = elementClass.split(' ')
    getPlayers(classes[0])
})

$(document.body).on('click', '#createCampaignBtn', function(event) {
    clear()
    
    const createCampaign = document.createElement('div')
    createCampaign.setAttribute('id','createCampaign')
    
    const createCampaignDMDiv = document.createElement('div')
    createCampaignDMDiv.classList.add('createCampaignCard')
    createCampaignDMDiv.setAttribute('id','createCampaignDMDiv')
    createCampaignDMDiv.textContent = 'What is your name?'

    const createCampaignNameDiv = document.createElement('div')
    createCampaignNameDiv.classList.add('createCampaignCard')
    createCampaignNameDiv.setAttribute('id','createCampaignNameDiv')
    createCampaignNameDiv.textContent = 'What is the name of your campaign?'

    const campaignDMEntry = document.createElement('input')
    campaignDMEntry.type = "text"
    campaignDMEntry.setAttribute('id','campaignDMEntry')

    const campaignNameEntry = document.createElement('input')
    campaignNameEntry.type = "text"
    campaignNameEntry.setAttribute('id','campaignNameEntry')

    const campaignCreate = document.createElement('button')
    campaignCreate.textContent = 'Create'
    campaignCreate.setAttribute('id','campaignCreate')
    
    document.body.appendChild(createCampaign)
    createCampaign.appendChild(createCampaignDMDiv)
    createCampaign.appendChild(createCampaignNameDiv)
    createCampaign.appendChild(campaignCreate)
    createCampaignNameDiv.appendChild(campaignNameEntry)
    createCampaignDMDiv.appendChild(campaignDMEntry)

    document.body.appendChild(createCampaign)
})

$(document.body).on('click', '#campaignCreate', function(event) {

    const createcampaign = document.createElement('div')
    createcampaign.setAttribute('id', 'createdCampaign')
    const url = connectionPoint + '/api/campaign'

    const newcampaign = {
        dm: $('#campaignDMEntry').val(),
        name: $(`#campaignNameEntry`).val()
    }

    console.log($('#campaignDMEntry').val())
    try{
        $.ajax({
            url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newcampaign), // Use newcampaign instead of createcampaign
            success: function(data) {
                createcampaign.textContent = `Successfully created ${newcampaign.name}`;
            },
            error: function(xhr, status, error) {
                createcampaign.textContent = `Failed to post Campaign, Error: ${error}`;
            }
        })
        clear()
        document.body.append(createcampaign);
    }catch(err){
        createcampaign.textContent = `Failed to post Campaign, Error:${err}`
    }
})

$(document.body).on('click', '#campaignCreate', function(event) {

    const createcampaign = document.createElement('div')
    createcampaign.setAttribute('id', 'createdCampaign')
    const url = connectionPoint +  '/api/campaign'

    const newcampaign = {
        dm: $('#campaignDMEntry').val(),
        name: $(`#campaignNameEntry`).val()
    }

    console.log($('#campaignDMEntry').val())
    try{
        $.ajax({
            url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newcampaign), // Use newcampaign instead of createcampaign
            success: function(data) {
                createcampaign.textContent = `Successfully created ${newcampaign.name}`;
            },
            error: function(xhr, status, error) {
                createcampaign.textContent = `Failed to post Campaign, Error: ${error}`;
            }
        })
        clear()
        document.body.append(createcampaign);
    }catch(err){
        createcampaign.textContent = `Failed to post Campaign, Error:${err}`
    }
})

$(document.body).on('click', '.characterViewBtn', function(event) {
    const elementClass = $(this).attr('class')
    const classes = elementClass.split(' ')
    console.log(elementClass[0])
    clear()

    const url = connectionPoint + `/api/character/${parseInt(classes[0])}`

    const charactersheet = document.createElement('div')
    charactersheet.setAttribute('id', 'charactersheet')

    $.ajax({
        url,
        type: 'GET',
        success: function(data) {
            charactersheet.textContent = JSON.stringify(data)
        },
        error: function(xhr, status, error) {
            console.log(error)
            charactersheet.textContent = `Failed to retrieve character sheet, Error: ${error}`
        }
    });
    document.body.appendChild(charactersheet)
})

$(document.body).on('click', '.characterDeleteBtn', function(event) {
    const elementClass = $(this).attr('class')
    const classes = elementClass.split(' ')
    clear()

    const url = connectionPoint + `/api/character/${parseInt(classes[0])}`

    const deletechar = document.createElement('div')
    deletechar.setAttribute('id', 'deletechar')

    $.ajax({
        url,
        type: 'DELETE',
        success: function(data) {
            deletechar.textContent = `Character deleted successfully`
        },
        error: function(xhr, status, error){
            console.log(error)
            deletechar.textContent = `Failed to delete character`
        }
    })
    document.body.appendChild(deletechar)
})

$(document.body).on('click', '.characterCreate', function(event) {
    clear()
    createCharSheet()

    const createBtn = document.createElement('button')
    createBtn.textContent = 'Create'
    createBtn.setAttribute('id','createCharacterBtn')
    createChar.appendChild(createBtn)
})

function createCharSheet(){
    console.log(someName)
    const createChar = document.createElement('div');
    createChar.setAttribute('id', 'createChar');

    const sections = [
        createSection('CharInfo', 'info', ['Name:', 'Race:', 'SubRace:', 'Class:', 'SubClass:', 'Size:', 'Alignment:']),
        createSection('charStat', 'stat', ['Str:', 'Dex:', 'Con:', 'Int:', 'Wis:', 'Cha:']),
        createSection('charSkill', 'skill', ['Acrobatics:', 'Animal Handling:', 'Arcana:', 'Athletics:', 'Deception:', 'History:', 'Insight:', 'Intimidation:', 'Investigation:', 'Medicine:', 'Nature:', 'Perception:', 'Performance:', 'Persuasion:','Religion:', 'Slight of Hand:', 'Stealth:', 'Survival:']),
        createSection('charProf', 'armor', ['Light Armor Proficiency:', 'Medium Armor Proficiency:', 'Heavy Armor Proficiency:', 'Shield Proficiency:'])
    ];

    sections.forEach(section => {
        createChar.appendChild(section);
    });

    document.body.appendChild(createChar);
}

function createSection(id, className, texts) {
    const sectionDiv = document.createElement('div')
    sectionDiv.setAttribute('id', id)
    
    texts.forEach((text, index) => {
        const container = document.createElement('div')
        const label = document.createElement('label')
        label.textContent = text
        const input = document.createElement('input')

        const inputId = `${className}-${index}`
        input.setAttribute('id', inputId)
        
        container.appendChild(label);
        container.appendChild(input);

        switch (className) {
            case 'info':
                input.setAttribute('type', 'text')
                break;
            case 'stat':
                input.setAttribute('type', 'number')
                input.setAttribute('min', 1)
                input.setAttribute('max', 20)
                break;
            case 'skill':
                input.setAttribute('type', 'number')
                input.setAttribute('min', 0)
                input.setAttribute('max', 20)
                break;
            case 'armor':
                input.setAttribute('type','checkbox')
                break;
            default:
                break;
        }
        const infoseven = $('#info-7')
        console.log(someName)
        infoseven.value = someName
        infoseven.disabled = true;

        sectionDiv.appendChild(container);
    });

    return sectionDiv;
}

$(document.body).on('click','#createCharacterBtn', function () {
    const createnewcharacter = document.createElement('div')
    createnewcharacter.setAttribute('id', 'createnewcharacter')
    const url = connectionPoint + '/api/character'

    const thenewcharacter = {
        name: $('#info-0').val(),
        race: $(`#info-1`).val(),
        subrace: $('#info-2').val(),
        class: $('#info-3').val(),
        subclass: $('#info-4').val(),
        size: $('#info-5').val(),
        alignment: $('#info-6').val(),
        strength: $('#stat-0').val(),
        dexterity: $('#stat-1').val(),
        constitution: $('#stat-2').val(),
        intelligence: $('#stat-3').val(),
        wisdom: $('#stat-4').val(),
        charisma: $('#stat-5').val(),
        acrobatics: $('#skill-0').val(),
        animal_handling: $('#skill-1').val(),
        arcana: $('#skill-2').val(),
        athletics: $('#skill-3').val(),
        deception: $('#skill-4').val(),
        history: $('#skill-5').val(),
        insight: $('#skill-6').val(),
        intimidation: $('#skill-7').val(),
        investigation: $('#skill-8').val(),
        medicine: $('#skill-9').val(),
        nature: $('#skill-10').val(),
        perception: $('#skill-11').val(),
        performance: $('#skill-12').val(),
        persuasion: $('#skill-13').val(),
        religion: $('#skill-14').val(),
        slight_of_hand: $('#skill-15').val(),
        stealth: $('#skill-16').val(),
        survivial: $('#skill-17').val(),
        light_armor: $('#prof-0').val(),
        medium_armmor: $('#prof-1').val(),
        heavy_armor: $('#prof-2').val(),
        shield: $('#prof-3').val(),
        player_id: someName
    };

    try{
        $.ajax({
            url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(thenewcharacter), // Use newcampaign instead of createcampaign
            success: function(data) {
                createnewcharacter.textContent = `Successfully created character`;
            },
            error: function(xhr, status, error) {
                createnewcharacter.textContent = `Failed to post character, Error: ${error}`;
            }
        })
        clear()
        document.body.append(createnewcharacter);
    }catch(err){
        createnewcharacter.textContent = `Failed to post character, Error:${err}`
    }
})

$(document.body).on('click','#createCharacterBtn', function () {
    const createnewcharacter = document.createElement('div')
    createnewcharacter.setAttribute('id', 'createnewcharacter')
    const url = connectionPoint + `/api/character/${parseInt()}`

    const creatingnewcharacter = {
        name: $('#info-0').val(),
        race: $(`#info-1`).val(),
        subrace: $('#info-2').val(),
        class: $('#info-3').val(),
        subclass: $('#info-4').val(),
        size: $('#info-5').val(),
        alignment: $('#info-6').val(),
        strength: $('#stat-0').val(),
        dexterity: $('#stat-1').val(),
        constitution: $('#stat-2').val(),
        intelligence: $('#stat-3').val(),
        wisdom: $('#stat-4').val(),
        charisma: $('#stat-5').val(),
        acrobatics: $('#skill-0').val(),
        animal_handling: $('#skill-1').val(),
        arcana: $('#skill-2').val(),
        athletics: $('#skill-3').val(),
        deception: $('#skill-4').val(),
        history: $('#skill-5').val(),
        insight: $('#skill-6').val(),
        intimidation: $('#skill-7').val(),
        investigation: $('#skill-8').val(),
        medicine: $('#skill-9').val(),
        nature: $('#skill-10').val(),
        perception: $('#skill-11').val(),
        performance: $('#skill-12').val(),
        persuasion: $('#skill-13').val(),
        religion: $('#skill-14').val(),
        slight_of_hand: $('#skill-15').val(),
        stealth: $('#skill-16').val(),
        survivial: $('#skill-17').val(),
        light_armor: $('#prof-0').val(),
        medium_armmor: $('#prof-1').val(),
        heavy_armor: $('#prof-2').val(),
        shield: $('#prof-3').val(),
        player_id: someName
    };

    try{
        $.ajax({
            url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(creatingnewcharacter), // Use newcampaign instead of createcampaign
            success: function(data) {
                createnewcharacter.textContent = `Successfully created ${thenewcharacter.name}`;
            },
            error: function(xhr, status, error) {
                createnewcharacter.textContent = `Failed to post character, Error: ${error}`;
            }
        })
        clear()
        document.body.append(createnewcharacter);
    }catch(err){
        createnewcharacter.textContent = `Failed to post character, Error:${err}`
    }
})

$(document.body).on('click', '.characterEditBtn', function() {
    const elementClass = $(this).attr('class')
    const classes = elementClass.split(' ')
    someChar = classes[0]
    const createnewcharacter = document.createElement('div')
    createnewcharacter.setAttribute('id', 'createnewcharacter')
    clear()
    createCharSheet()
    const url = connectionPoint + `/api/character/${classes[0]}`
    try{
        $.ajax({
        url,
        type: 'GET',
        success: function(data) {
            data.forEach(para => {
                $('#info-0').val(para.name),
                $('#info-1').val(para.race),
                $('#info-2').val(para.subrace),
                $('#info-3').val(para.class);
                $('#info-4').val(para.subclass);
                $('#info-5').val(para.size);
                $('#info-6').val(para.alignment);
                $('#stat-0').val(para.strength);
                $('#stat-1').val(para.dexterity);
                $('#stat-2').val(para.constitution);
                $('#stat-3').val(para.intelligence);
                $('#stat-4').val(para.wisdom);
                $('#stat-5').val(para.charisma);
                $('#skill-0').val(para.acrobatics);
                $('#skill-1').val(para.animal_handling);
                $('#skill-2').val(para.arcana);
                $('#skill-3').val(para.athletics);
                $('#skill-4').val(para.deception);
                $('#skill-5').val(para.history);
                $('#skill-6').val(para.insight);
                $('#skill-7').val(para.intimidation);
                $('#skill-8').val(para.investigation);
                $('#skill-9').val(para.medicine);
                $('#skill-10').val(para.nature);
                $('#skill-11').val(para.perception);
                $('#skill-12').val(para.performance);
                $('#skill-13').val(para.persuasion);
                $('#skill-14').val(para.religion);
                $('#skill-15').val(para.slight_of_hand);
                $('#skill-16').val(para.stealth);
                $('#skill-17').val(para.survival);
                $('#prof-0').val(para.light_armor);
                $('#prof-1').val(para.medium_armor);
                $('#prof-2').val(para.heavy_armor);
                $('#prof-3').val(para.shield);
                someName = para.player_id;
            });  
        },
    })
    }catch(err){
        console.log(err)
    }
    const confirmBtn = document.createElement('button')
    confirmBtn.setAttribute('id','confirmBtn')
    confirmBtn.textContent = 'confirm'
    document.getElementById('createChar').appendChild(confirmBtn)
})

$(document.body).on('click', '#confirmBtn', function(){
    const url = connectionPoint + `/api/character/${someChar}`
    const editcharacter = {
        name: $('#info-0').val(),
        race: $(`#info-1`).val(),
        subrace: $('#info-2').val(),
        class: $('#info-3').val(),
        subclass: $('#info-4').val(),
        size: $('#info-5').val(),
        alignment: $('#info-6').val(),
        strength: $('#stat-0').val(),
        dexterity: $('#stat-1').val(),
        constitution: $('#stat-2').val(),
        intelligence: $('#stat-3').val(),
        wisdom: $('#stat-4').val(),
        charisma: $('#stat-5').val(),
        acrobatics: $('#skill-0').val(),
        animal_handling: $('#skill-1').val(),
        arcana: $('#skill-2').val(),
        athletics: $('#skill-3').val(),
        deception: $('#skill-4').val(),
        history: $('#skill-5').val(),
        insight: $('#skill-6').val(),
        intimidation: $('#skill-7').val(),
        investigation: $('#skill-8').val(),
        medicine: $('#skill-9').val(),
        nature: $('#skill-10').val(),
        perception: $('#skill-11').val(),
        performance: $('#skill-12').val(),
        persuasion: $('#skill-13').val(),
        religion: $('#skill-14').val(),
        slight_of_hand: $('#skill-15').val(),
        stealth: $('#skill-16').val(),
        survivial: $('#skill-17').val(),
        light_armor: $('#prof-0').val(),
        medium_armmor: $('#prof-1').val(),
        heavy_armor: $('#prof-2').val(),
        shield: $('#prof-3').val(),
        player_id: someName
    }

    const patchcharacter = document.createElement('div')
    patchcharacter.setAttribute('id','patchcharacter')
    clear()

    try{
        $.ajax({
            url,
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(editcharacter),
            success: function(data) {
                patchcharacter.textContent = 'Seccessfully edited character'
                console.log(data)
            }
        })
    }catch(err){
        patchcharacter.textContent = (err)
    }
    document.body.appendChild(patchcharacter)
})