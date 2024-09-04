/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true, // Enable the Server Actions feature
    },
    env: {
        OPENAI_API_KEY : "sk-None-FslNaeM0s2K62rn0yATgT3BlbkFJZbD85pPERMvAbeLUNOrm",
        PINECONE_API_KEY:"1959db2f-9075-40c7-b2a4-b5a3ca3728f0",
        PINECONE_INDEX:"bible",
        GOOGLE_ID:"1073031122362-dksr58bjnknq38jiffapeps9207goipk.apps.googleusercontent.com",
        GOOGLE_SECRET:"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",
        NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID:"ca-pub-9584439109294168",
        GOOGLE_ADS_SLOT:"2154746507",
        AUTH_SECRET:"bdaMG0M9aooIUnJYys7VdZfqyvt3/g9zmg+AkwbaIqU="
    }
}

module.exports = nextConfig
