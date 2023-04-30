import moment, { MomentInput } from "moment";
import React, { useEffect, useState } from "react";
import PostsContext from "../context/PostsContext";
import { BlogEntry, PostCategory } from "../types";
import * as uuid from "uuid";

const initValue = `# Conbibitur tu Pelates murmure et altera via

## Creatus utiliter Iapygis omnis conanti temptavit tamen

Lorem markdownum an patet pedum, et volucrum, per. Error ab inque timent talia
atque aere paulatim morientem *cannas geminat* suprema ardor pericula viros!

> Deserat ira [vulnere perque](http://pulsus.net/) arva taeda gratare venit,
> Pirithoo tuo Finierat per *domus montes vincit*, paciscitur. *Unicus petendo
> Pactolides* spatioso **vocant**, novit, voces *tremensque ad regem* rostrisque
> sedem talem in situ *et*, ire. Aphidas hoc arsit meruisse sistrorum artus
> haeret me lacertis senectus ponentem terra sanguine.

## Regna submissaeque est corpore sequenti

Lumina mihi vara putat scilicet manus. Monilia ego fide quo; foret montibus
obmutuit dicta guttura contra. Ora venit meas patiente. Huc gelidum fulget,
terrae alis nisi, cumulusque solidis effigiem morbi non. Mollibus vulnus
roboribusque cum cui tibi si exstantem quondam manu mors pinguntur rediit?

\`\`\`javascript
computing -= directx(ramFiosActive, computer_scroll_web(logic, status,
        w_inbox), cable);
sla(duplex);
var ergonomicsTransferPlug = progressive_domain;
\`\`\`

## Passu atque Iove mercurio tibia nec ibat

Defensus hunc, nec facta postes, ait est fidissima tuas; fecit **duos**, in
exsultat. Toto quod ille notis nympharum nefandos valido explet vertere: ludere
ignes Musa subiere trepidante feras!

## Ergo Iuno erat suos sonuit

Patriamque hasta moras, piscem, [rigidum populo](http://instabiles.org/) iam.
Ventre refert non Cephisos essem vestes succiso, nullae iram violente?

\`\`\`javascript
adArchitectureVersion = batch_java_cpa / graymail_barebones_listserv;
var apache_ole = card_xp_ppp;
if (media_paper_microcomputer + multitaskingPrinterGigaflops >= 5) {
    card.spoofing -= 25 + backsideService * 5;
    dvdMidi = 3 * 1;
} else {
    digitalFirewire = ctp_virus_c;
    domain_udp(webmailUtfWinsock(-2));
}
var kibibyteRegistry = dma_system(real.prebinding.vector_frequency(1, 4,
        fat));
bezelMemoryHardware.dock_baud_constant = ray_intranet / 639104 + 1 *
        basic_computing_toolbar(spreadsheet_drive_ata);
\`\`\`

Inania *ardor vultus* in reor pavidum, Antiphataeque sine nec, ille fratrem.
Viminis suco. Caecum ipsosque prensam. Vellem erat: delectat sepulti salutifer
iustius eripiet arva ipse **tendite vastique**; percepto ut hortator, certum!`;

export const initBlog = {
    id: uuid.v4(),
    date: moment().toISOString(),
    title: "Insert title",
    url: "insert-title",
    content: initValue,
    description: "Insert description",
    images: [],
    comments: "",
    type: PostCategory.WEB_DEV,
};

function PostsContextProvider({ children }: { children: any }) {
    const [posts, setPosts] = useState<BlogEntry[]>([]);
    const [drafts, setDrafts] = useState<BlogEntry[]>([]);
    const [activeDraft, setActiveDraft] = useState<BlogEntry>(initBlog);
    const [tableOfContents, setTableOfContents] = useState<any>(null);

    const addPost = (post: BlogEntry) => {
        setPosts([...posts, post]);
    };

    const addDraft = (draft: BlogEntry) => {
        setDrafts((drafts) => [...drafts, draft]);
    };

    const removeDraft = (draft: BlogEntry) => {
        setDrafts((drafts) => drafts.filter((item) => item.id !== draft.id));
    };

    const removePost = (post: BlogEntry) => {
        setPosts((posts) => posts.filter((item) => item.id !== post.id));
    };

    return (
        <PostsContext.Provider
            value={{
                posts,
                setPosts,
                addPost,
                activeDraft,
                setActiveDraft,
                drafts,
                addDraft,
                removeDraft,
                removePost,
                setDrafts,
                tableOfContents,
                setTableOfContents,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
}

export default PostsContextProvider;
