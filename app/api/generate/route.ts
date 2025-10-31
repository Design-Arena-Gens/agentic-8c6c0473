import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { projectContext } = await request.json();

    if (!projectContext || projectContext.trim() === '') {
      return NextResponse.json(
        { error: 'Project context is required' },
        { status: 400 }
      );
    }

    const post = generateLinkedInPost(projectContext);

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error generating post:', error);
    return NextResponse.json(
      { error: 'Failed to generate post' },
      { status: 500 }
    );
  }
}

function generateLinkedInPost(context: string): string {
  const hooks = [
    "Ever wonder why some designs just feel right? 💡",
    "Here's what nobody tells you about great design... ✨",
    "The best designs are invisible. Let me explain. 🎨",
    "Sometimes the smallest details make the biggest impact. 💡",
    "What if I told you that simplicity is the hardest thing to design? 🧠",
    "Great design isn't about what you add—it's about what you remove. ✨",
    "The difference between good and great design? Intention. 🔥",
    "Design is not just how it looks. It's how it works. 💡"
  ];

  const tools = [
    "Figma",
    "Adobe XD",
    "Sketch",
    "Framer",
    "Principle",
    "ProtoPie",
    "AI-assisted design tools",
    "user testing platforms"
  ];

  const ctas = [
    "What's your biggest design challenge right now?",
    "How do you approach simplicity in your designs?",
    "What design tools are you loving lately?",
    "What's one design principle you swear by?",
    "How do you balance aesthetics with functionality?",
    "What's the most valuable design lesson you've learned?",
    "Do you agree? What would you add?",
    "What's your go-to tool for this kind of work?"
  ];

  const hashtags = [
    "#UIDesign #UXDesign #DesignThinking #ProductDesign #DigitalDesign #CreativeProcess #DesignInspiration",
    "#UIUXDesign #WebDesign #AppDesign #UserExperience #DesignCommunity #DesignTips #CreativeWork",
    "#DesignArena #UIUX #Figma #ProductDesign #DesignSystem #BrandDesign #DigitalCreative",
    "#UserInterface #UserExperience #DesignProcess #CreativeDesign #DesignDaily #UXResearch #DesignLife",
    "#UIInspiration #DesignStudy #ProductDesigner #UXDesigner #DesignWork #VisualDesign #InteractionDesign",
    "#DesignTrends #ModernDesign #MinimalDesign #DesignDetails #DesignMatters #UXStrategy #DesignLeadership"
  ];

  const hook = hooks[Math.floor(Math.random() * hooks.length)];
  const tool1 = tools[Math.floor(Math.random() * tools.length)];
  const tool2 = tools[Math.floor(Math.random() * tools.length)];
  const cta = ctas[Math.floor(Math.random() * ctas.length)];
  const hashtagSet = hashtags[Math.floor(Math.random() * hashtags.length)];

  const post = `${hook}

${context}

Throughout this project, we learned that great design isn't just about aesthetics—it's about solving real problems for real people. Every color choice, every spacing decision, every interaction was intentional.

We leveraged tools like ${tool1} and ${tool2} to bring our vision to life, iterating quickly and testing with actual users to ensure we weren't just designing for ourselves, but for the people who would use it every day.

The result? A product that not only looks beautiful but genuinely improves how people interact with technology. That's the sweet spot we're always chasing at Design Arena. 🎯

${cta}

---

${hashtagSet}`;

  return post;
}
