import {
    SNSClient,
    PublishCommand,
    SetSMSAttributesCommand,
    CheckIfPhoneNumberIsOptedOutCommand
} from "@aws-sdk/client-sns"
import {response} from "express";

export const snsClient = new SNSClient({
    Region: config.aws.region
})

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