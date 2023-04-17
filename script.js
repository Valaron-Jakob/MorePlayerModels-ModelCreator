function download(model_name, menu, part, author, texture_path, use_skin, animation, prev_rot, model_json) {
    let element = document.createElement('a')
    let model = JSON.parse(model_json)

    let conversation = {
        name: model_name,
        menu: menu,
        author: author,

        body_part: part,
        hidden_parts: [],
        texture: `moreplayermodels:${texture_path}`,
        can_use_player_skin: false,
        preview_rotation: prev_rot,

        //translate: [0, 0, 0],
        //scale: [1, 1, 1],
        //rotate: [0, 0, 0],
        //rotate_offset: [0, 0, 0],

        animation_type: animation,
        
        render_type: "bedrock",
        render_data: model
    }
    
    if (use_skin == 1) {
        conversation.can_use_player_skin = true
    }

    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(conversation, null, "\t")))
    element.setAttribute('download', `${model_name}.json`)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click();

    document.body.removeChild(element)
}