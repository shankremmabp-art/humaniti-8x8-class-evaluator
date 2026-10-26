// Pre-curated benchmark recordings representing the 4 tiers of class quality
// Evaluators can instantly test and explore the deep multimodal analysis without having to download 500MB video files.

export const BENCHMARK_CLASSES = [
  {
    id: 'class-excellent',
    title: 'Class A: "Journey into Fractions" (Math Grade 3)',
    grade: 'Excellent',
    score: 94,
    badgeColor: '#10b981', // Emerald
    teacherName: 'Ms. Sarah Chen',
    duration: '28:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // sample demo video stream
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    summary: 'Masterclass in early-childhood online instruction. Teacher exhibits dynamic vocal modulation, uses high-frequency low-stakes comprehension checks, maintains an 8.2s average response wait time, and pairs verbal instructions with active visual whiteboard drawing.',
    keyMetrics: {
      teacherTalkRatio: '46%',
      studentParticipationRatio: '54%',
      avgResponseWaitTime: '8.2s',
      questionsAskedPerHour: 48,
      positiveReinforcements: 34,
      pacingWpm: 128,
      deadAirMoments: 1
    },
    dimensionScores: [
      { name: 'Teacher Delivery & Tone', score: 96, weight: '25%', detail: 'Warm, patient vocal prosody, varied inflection, pauses before key terms' },
      { name: 'Student Engagement & Wait Time', score: 95, weight: '30%', detail: 'Gives ample time for child formulation, calls on varied students by name' },
      { name: 'Visual & Screen Ergonomics', score: 92, weight: '20%', detail: 'Dynamic on-screen annotations, clutter-free slides, high webcam presence' },
      { name: 'Pedagogical Scaffolding', score: 94, weight: '25%', detail: 'Clear "I do, We do, You do" progression with real-world pizza slice analogy' }
    ],
    signalsAnalysis: {
      meaningful: [
        {
          signal: 'High Child-to-Teacher Speaking Ratio (54% child / 46% teacher)',
          impact: 'Positive',
          reason: 'Young learners stay focused through active dialogue and co-discovery rather than passive listening.'
        },
        {
          signal: '8.2s Wait Time After Asking Questions',
          impact: 'Positive',
          reason: 'Children require 5-10s to process auditory language and formulate verbal responses; teacher resists interrupting silence.'
        },
        {
          signal: 'Dynamic Multi-Color Live Highlighting on Screen',
          impact: 'Positive',
          reason: 'Keeps visual gaze oriented towards the active mathematical denominator during explanation.'
        }
      ],
      misleading: [
        {
          signal: 'Occasional Background Noise from Student Microphone',
          impact: 'Misleading / Low Impact',
          reason: 'Background family sounds or audio artifacts could artificially lower audio metrics in naive algorithms, but pedagogical flow was completely unaffected.'
        },
        {
          signal: 'Slightly Slower Words Per Minute (128 WPM)',
          impact: 'Misleading / Actually Positive',
          reason: 'Adult business meetings favor 150-160 WPM, but 120-130 WPM is optimal cognitive tempo for 7-9 year olds.'
        }
      ]
    },
    timestampedObservations: [
      { time: '01:15', seconds: 75, type: 'Praise', title: 'Personalized Welcome & Connection', description: 'Welcomes Leo and Maya by name, referencing Leo\'s pet drawing from last week to establish psychological safety.' },
      { time: '04:30', seconds: 270, type: 'Pedagogy', title: 'Explicit Learning Goal Hook', description: 'Sets visual objective: "Today we will become fraction chefs cutting 1 whole cake into equal parts".' },
      { time: '08:45', seconds: 525, type: 'Engagement', title: 'Open-ended Question with 9s Wait Time', description: 'Asks: "What happens if Maya\'s slice is twice as big as Leo\'s? Is that fair?" Waits 9.2s patiently before Maya responds.' },
      { time: '14:20', seconds: 860, type: 'Visual', title: 'Interactive Screen Annotation', description: 'Hands screen annotation control to Leo to draw the dividing line on the digital whiteboard.' },
      { time: '21:10', seconds: 1270, type: 'Praise', title: 'Growth Mindset Correction', description: 'Student miscounts 3/8 as 3/6. Teacher: "Ooh, I love how you got the top number right! Let\'s count the total pieces together."' },
      { time: '26:50', seconds: 1610, type: 'Pedagogy', title: 'Structured Exit Ticket Recap', description: 'Quick 2-minute visual check-in with thumbs-up/thumbs-down before closing.' }
    ],
    coachingAdvice: [
      'Celebrate Ms. Chen\'s wait-time discipline as a benchmark video for onboarding new 8x8 tutors.',
      'Slight improvement: Ensure student microphones are auto-muted when other children are actively speaking to avoid cross-talk.'
    ]
  },
  {
    id: 'class-good',
    title: 'Class B: "Solar System Explorers" (Science Grade 4)',
    grade: 'Good',
    score: 81,
    badgeColor: '#3b82f6', // Blue
    teacherName: 'Mr. David Miller',
    duration: '25:10',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    summary: 'A solid, engaging lesson with strong content delivery and energetic presentation. The teacher explains concepts clearly using good visuals, but occasionally dominates speaking time (68%) and answers his own questions if students take more than 3 seconds to reply.',
    keyMetrics: {
      teacherTalkRatio: '68%',
      studentParticipationRatio: '32%',
      avgResponseWaitTime: '3.4s',
      questionsAskedPerHour: 32,
      positiveReinforcements: 19,
      pacingWpm: 146,
      deadAirMoments: 2
    },
    dimensionScores: [
      { name: 'Teacher Delivery & Tone', score: 88, weight: '25%', detail: 'Energetic, friendly tone; clear enunciation and enthusiastic presentation' },
      { name: 'Student Engagement & Wait Time', score: 72, weight: '30%', detail: 'Calls on students regularly, but cuts off silence too quickly (3.4s avg wait time)' },
      { name: 'Visual & Screen Ergonomics', score: 86, weight: '20%', detail: 'Visually appealing planet slides, but text is occasionally dense for 9-year-olds' },
      { name: 'Pedagogical Scaffolding', score: 79, weight: '25%', detail: 'Good narrative flow, but needs more frequent micro-comprehension checks' }
    ],
    signalsAnalysis: {
      meaningful: [
        {
          signal: 'High Teacher Energy & Enthusiasm',
          impact: 'Positive',
          reason: 'Vocal inflection keeps children attentive and curious during planetary science concepts.'
        },
        {
          signal: 'Short Wait Time (3.4s) Leading to Teacher Answering Own Questions',
          impact: 'Negative Area',
          reason: 'Restricts shy children from developing their own problem-solving explanations.'
        }
      ],
      misleading: [
        {
          signal: 'Fast Continuous Speaking Pace (146 WPM)',
          impact: 'Misleading',
          reason: 'Sounds lively and knowledgeable, but risks losing children who are slower auditory processors.'
        }
      ]
    },
    timestampedObservations: [
      { time: '02:00', seconds: 120, type: 'Engagement', title: 'Energetic Class Kickoff', description: 'Shows rotating 3D simulation of Jupiter, capturing immediate visual attention.' },
      { time: '07:15', seconds: 435, type: 'Issue', title: 'Premature Answer Bailout', description: 'Asks: "Why doesn\'t Mars have liquid water on its surface?" Waits only 2.5s before answering it himself.' },
      { time: '13:40', seconds: 820, type: 'Pedagogy', title: 'Effective Scale Comparison', description: 'Compares Earth to a marble and Jupiter to a basketball; great tangible mental anchor.' },
      { time: '19:30', seconds: 1170, type: 'Praise', title: 'Encouraging Student Question', description: 'Commends student asking about Saturn\'s rings: "That is an astronomer-level question!"' }
    ],
    coachingAdvice: [
      'Practice "Count to 5 in your head" before stepping in after asking a question.',
      'Reduce teacher monologue blocks: break 5-minute explanations into 2-minute chunks followed by student polls or reactions.'
    ]
  },
  {
    id: 'class-average',
    title: 'Class C: "Basic Grammar & Sentence Building" (English Grade 2)',
    grade: 'Average',
    score: 64,
    badgeColor: '#f59e0b', // Amber
    teacherName: 'Ms. Rebecca Taylor',
    duration: '22:15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    summary: 'Adequate but passive lesson. The teacher reads directly from PowerPoint slides with little vocal modulation. Students are polite and present, but engagement is largely compliance-driven rather than active excitement. Only 2 out of 5 students spoke during the 22-minute session.',
    keyMetrics: {
      teacherTalkRatio: '84%',
      studentParticipationRatio: '16%',
      avgResponseWaitTime: '2.1s',
      questionsAskedPerHour: 14,
      positiveReinforcements: 8,
      pacingWpm: 110,
      deadAirMoments: 6
    },
    dimensionScores: [
      { name: 'Teacher Delivery & Tone', score: 62, weight: '25%', detail: 'Monotone reading cadence, limited facial animation, low vocal dynamics' },
      { name: 'Student Engagement & Wait Time', score: 58, weight: '30%', detail: 'Relies on the same eager student; other 4 students remained passive listeners' },
      { name: 'Visual & Screen Ergonomics', score: 68, weight: '20%', detail: 'Static slides with large blocks of unhighlighted text; no live pointer or drawing' },
      { name: 'Pedagogical Scaffolding', score: 67, weight: '25%', detail: 'Covers the definition of nouns and verbs, but lacks guided interactive exercises' }
    ],
    signalsAnalysis: {
      meaningful: [
        {
          signal: '84% Teacher Speaking Time',
          impact: 'Critical Red Flag',
          reason: 'For Grade 2 children (age 7), passive listening beyond 4 minutes leads to rapid attention detachment.'
        },
        {
          signal: 'Selective Student Engagement Bias',
          impact: 'Negative',
          reason: 'Only interactively engaged with 1 child who had hand raised, neglecting the other silent participants.'
        }
      ],
      misleading: [
        {
          signal: 'Quiet, Calm Classroom Audio',
          impact: 'Misleading',
          reason: 'Zero background disruptions or student talking might seem "orderly" to an audio filter, but actually indicated complete lack of child interaction.'
        }
      ]
    },
    timestampedObservations: [
      { time: '01:30', seconds: 90, type: 'Pedagogy', title: 'Text-Dense Slide Introduction', description: 'Shares slide with 6 bullet points of text and reads each line verbatim.' },
      { time: '06:40', seconds: 400, type: 'Issue', title: 'Disengaged Student Ignored', description: 'Camera shows student looking away from screen for 4 consecutive minutes without teacher re-engagement.' },
      { time: '12:15', seconds: 735, type: 'Engagement', title: 'Single-Student Interaction', description: 'Asks a question, picks the student who always answers, praises them, and immediately moves on.' },
      { time: '18:50', seconds: 1130, type: 'Visual', title: 'Screen Freeze / Stale Visual', description: 'Leaves the same static slide on screen for 6 minutes while talking about related concepts.' }
    ],
    coachingAdvice: [
      'Incorporate total participation techniques: have all kids hold up fingers or type 1/2 in chat instead of cold-calling one child.',
      'Replace text-heavy slides with image cards and interactive fill-in-the-blank blanks.'
    ]
  },
  {
    id: 'class-poor',
    title: 'Class D: "Introduction to Coding Concepts" (Intro Grade 4)',
    grade: 'Poor',
    score: 41,
    badgeColor: '#ef4444', // Red
    teacherName: 'Substitute Instructor',
    duration: '21:05',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
    summary: 'Severely deficient online learning session. Plagued by technical friction (screen sharing errors, echo loop for 3 minutes), disorganized curriculum pacing, frustration in teacher\'s tone, and zero interactive checks for student understanding.',
    keyMetrics: {
      teacherTalkRatio: '89%',
      studentParticipationRatio: '11%',
      avgResponseWaitTime: '1.2s',
      questionsAskedPerHour: 6,
      positiveReinforcements: 2,
      pacingWpm: 92,
      deadAirMoments: 14
    },
    dimensionScores: [
      { name: 'Teacher Delivery & Tone', score: 38, weight: '25%', detail: 'Audible sighs, impatient tone when student asked for repeat, flat affect' },
      { name: 'Student Engagement & Wait Time', score: 35, weight: '30%', detail: 'Students muted virtually the whole time; 1 student dropped off after 10 mins' },
      { name: 'Visual & Screen Ergonomics', score: 44, weight: '20%', detail: 'Wrong window shared for 4 minutes; font size in code editor too small to read' },
      { name: 'Pedagogical Scaffolding', score: 46, weight: '25%', detail: 'Jumped straight into syntax without explaining the core algorithm or concept' }
    ],
    signalsAnalysis: {
      meaningful: [
        {
          signal: 'High Frequency of Dead Air (14 instances, 4m20s total)',
          impact: 'Critical Negative',
          reason: 'Extended unannounced pauses while teacher clicks around or fixes window leads to immediate student tab-switching.'
        },
        {
          signal: 'Negative Vocal Tone & Impatience',
          impact: 'Severe',
          reason: 'Snapping "I already said that" destroys confidence and psychological safety in young students.'
        },
        {
          signal: 'Low Screen Readability',
          impact: 'Negative',
          reason: 'Micro-font code editor shared without zoom made screen content illegible on student tablets.'
        }
      ],
      misleading: [
        {
          signal: 'Complex Technical Vocabulary Used',
          impact: 'Misleading',
          reason: 'A naive NLP keyword detector might rate this "advanced learning", but the concepts were developmentally inappropriate without scaffolding.'
        }
      ]
    },
    timestampedObservations: [
      { time: '00:45', seconds: 45, type: 'Issue', title: '3-Minute Audio Echo & Mic Friction', description: 'Instructor fails to mute secondary audio feedback loop, confusing children.' },
      { time: '04:10', seconds: 250, type: 'Visual', title: 'Wrong Window Shared', description: 'Shares instructor email inbox instead of code editor for over 3 minutes.' },
      { time: '09:20', seconds: 560, type: 'Issue', title: 'Impatient Tone Toward Child', description: 'Child asks: "Where is the green block?" Teacher sighs loudly and responds: "Look at the screen where I told you."' },
      { time: '15:40', seconds: 940, type: 'Engagement', title: 'Student Dropout', description: 'One student turns off webcam and leaves meeting without instructor noticing.' }
    ],
    coachingAdvice: [
      'Urgent intervention required before assigning additional classes.',
      'Mandatory retraining on technical setup: screen sharing hygiene, dual-monitor management, and audio check.',
      'Empathy and child-friendly communication workshop required.'
    ]
  }
];

// Helper to calculate classification grade from numerical score
export function getGradeFromScore(score) {
  if (score >= 88) return { label: 'Excellent', color: '#10b981', badgeClass: 'bg-emerald-500' };
  if (score >= 72) return { label: 'Good', color: '#3b82f6', badgeClass: 'bg-blue-500' };
  if (score >= 55) return { label: 'Average', color: '#f59e0b', badgeClass: 'bg-amber-500' };
  return { label: 'Poor', color: '#ef4444', badgeClass: 'bg-rose-500' };
}
