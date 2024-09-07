import {
    SNSClient,
    PublishCommand,
    SetSMSAttributesCommand,
    CheckIfPhoneNumberIsOptedOutCommand
} from "@aws-sdk/client-sns"
import {createCredentialChain, fromEnv} from "@aws-sdk/credential-providers"

let snsClient;

export const create_sns_client = config => {
    snsClient = new SNSClient({
        region: config.aws.region,
        credentials: createCredentialChain(
            fromEnv(),
        ),
    })
}

export const setSmsType = async (defaultSmsType = "Transactional") => {
    const response = await snsClient.send(
        new SetSMSAttributesCommand({
            attributes: {
                DefaultSmsType: defaultSmsType
            }
        })
    )

    return response
}

export const sendSms = async (phoneNumber, message) => {
    const response = await snsClient.send(
        new PublishCommand({
            PhoneNumber: phoneNumber,
            Message: message
        })
    )

    return response
}

export const checkIfPhoneNumberIsOptedOut = async (phoneNumber) => {
    const response = await snsClient.send(
        new CheckIfPhoneNumberIsOptedOutCommand({
            phoneNumber: phoneNumber
        })
    )

    return response
}