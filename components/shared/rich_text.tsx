"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import React from "react";
import {
Bold,
Italic,
List,
ListOrdered,
Heading1,
Heading2,
Heading3,
Link as LinkIcon,
Unlink
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "../ui/button";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const RichTextEditor = ({ value, onChange }: Props) => {
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({ levels: [1, 2, 3] }),
            Link.configure({ openOnClick: false }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return null;

    return (
        <div className="space-y-2">
            <div className="flex gap-2 flex-wrap text--editor">
            <Toggle
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                aria-label="Gras"
            >
                <Bold className="h-4 w-4" />
            </Toggle>

            <Toggle
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Italique"
            >
                <Italic className="h-4 w-4" />
            </Toggle>

            <Toggle
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                aria-label="Titre H1"
            >
                <Heading1 className="h-4 w-4" />
            </Toggle>

            <Toggle
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label="Titre H2"
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>

            <Toggle
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                aria-label="Titre H3"
            >
                <Heading3 className="h-4 w-4" />
            </Toggle>

            <Toggle
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                editor.chain().focus().toggleBulletList().run()
                }
                aria-label="Liste à puces"
            >
                <List className="h-4 w-4" />
            </Toggle>

            <Toggle
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                editor.chain().focus().toggleOrderedList().run()
                }
                aria-label="Liste numérotée"
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>

            <Button type="button" className="link--button"
                onClick={() => {
                const url = prompt("Entrez l’URL du lien :");
                if (url) {
                    editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .setLink({ href: url })
                    .run();
                }
                }}
                aria-label="Ajouter un lien"
            >
                <LinkIcon className="h-4 w-4" />
            </Button>

            <Button type="button" className="link--button"
                onClick={() => {
                editor.chain().focus().unsetLink().run();
                }}
                aria-label="Supprimer le lien"
            >
                <Unlink className="h-4 w-4" />
            </Button>
            </div>

            <div className="text--editor min-h-[500px]">
            <EditorContent editor={editor} spellCheck={false} />
            </div>
        </div>
    );
};

export default RichTextEditor;
