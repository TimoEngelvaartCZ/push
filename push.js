let push = require('web-push');

let vapidKeys = { 
    publicKey: 'BPE9lTTz3k1v6NkVwZcntTKmE9vBe9GYm8GRaBMQrxVvo8AhYgmZg2-TJWpH70ROPSE1ajf_BscMBv-HPkMZKMc',
    privateKey: 'lfI5NQYIQZGSJ6NK7PxFStAn4bvtoTwu9NPB9Zaqy8U' 
}

push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey)

let sub = {}

push.sendNotification(sub, 'test message');