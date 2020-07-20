let push = require('web-push');

let vapidKeys = { 
    publicKey: 'BPE9lTTz3k1v6NkVwZcntTKmE9vBe9GYm8GRaBMQrxVvo8AhYgmZg2-TJWpH70ROPSE1ajf_BscMBv-HPkMZKMc',
    privateKey: 'lfI5NQYIQZGSJ6NK7PxFStAn4bvtoTwu9NPB9Zaqy8U' 
}

push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey)

let sub = {"endpoint":"https://db5p.notify.windows.com/w/?token=BQYAAADVB9pycpa8aSEZced1rO%2fgMmLvGA9Gz7PHEEspGuBa2OLhynLusvKEKSlHBBX8FoMwtgRVBempHL7%2bzQJpOl%2fOLuu4QYKggUqvaoYoPFEKlPi0n59jwxH0Q9vM3v7LZMDaeO2dezU4AoQfdP6qAf%2bNX6xX0sglQC6e5sQcowQMdRVuC5r9JBNlFG3TbV5zgmjNTei2LMX%2fEcdMKkERzK8XMoWxoA%2fMVRLq%2fe4DECCteLshIxMJqxhlS7gSUpDmT2zUMaPOXQyhPbw2peXHU4%2bN1PmlWgP9ARzucQFoHD5SmP%2bNexJS40UTIu7yUlyEhOl6N1g6VkRmIh1h0miUf5udqsnb6QS%2bX46Iet4101sMsg%3d%3d","expirationTime":null,"keys":{"p256dh":"BL7D8_tzfX9RfSf8cAkRLoMvRgqC4oJq-AYP9BZlfttlCfv0goHgCHDuHJvlBxbQwSJDh6Pfot66VIS5dyHgRaI","auth":"bSxg6Hm7A3C83CbFeFLS2w"}}

push.sendNotification(sub, 'test message');