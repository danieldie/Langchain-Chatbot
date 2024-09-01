import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import {ConversationalRetrievalQAChain} from "langchain/chains";

async function initChain() {
    const model = new OpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY
    });

    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY ?? '',
    });

    const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX ?? '');

    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
        }),
        {
            pineconeIndex: pineconeIndex,
            textKey: 'text',
        },
    );

    return ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorStore.asRetriever(),
        {returnSourceDocuments: true}
    );
}

export const chain = await initChain()