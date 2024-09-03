import { NextResponse } from 'next/server';
import {chain} from "@/utils/chain";
import {Message} from "@/types/message";

export async function POST(request: Request) {

    const body = await request.json();
    const question: string = body.query;
    const history: Message[] = body.history ?? []

    const res = await chain.call({
            question: question,
            chat_history: history.map(h => h.content).join("\n"),
        });

    const links: string[] = Array.from(
        new Set(
            res.sourceDocuments
              .filter((document: { metadata: { source?: string } }) => document.metadata.source)
              .map((document: { metadata: { source: string } }) => document.metadata.source)
          )
    )

    const verseContents: string[] = Array.from(new Set(res.sourceDocuments.map(( document:{ pageContent: string }) => document.pageContent )));

    return NextResponse.json({role: "assistant", content: res.text, links: links, verseContents: verseContents})
}