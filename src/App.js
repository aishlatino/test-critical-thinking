import React, { useState, useEffect, useRef } from 'react';
import { Play, Check, X, AlertCircle, ChevronRight, Info, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';

const COLORS = {
  graphite: '#1B1B1B',
  grey: '#303030',
  orange: '#FA4B0E',
  neonTeal: '#00FFD1',
  mutedTeal: '#00CEA9',
  green: '#10B981',
  red: '#EF4444',
};

const App = () => {
  // --- State Management ---
  const [al1Response, setAl1Response] = useState(null); // 'report' | 'continue'
  
  const [al2Selections, setAl2Selections] = useState([]);
  const [al2Submitted, setAl2Submitted] = useState(false);

  const [review1Response, setReview1Response] = useState(null); // boolean
  const [review2Response, setReview2Response] = useState(null); // index

  // --- Refs for Auto-scrolling ---
  const textSection1Ref = useRef(null);
  const feedbackSection2Ref = useRef(null);
  const bottomRef = useRef(null);

  // --- Progress Calculation ---
  const totalSteps = 4;
  let completedSteps = 0;
  if (al1Response) completedSteps++;
  if (al2Submitted) completedSteps++;
  if (review1Response !== null) completedSteps++;
  if (review2Response !== null) completedSteps++;
  const progress = (completedSteps / totalSteps) * 100;

  // --- Handlers ---
  const handleAl2Toggle = (index) => {
    if (al2Submitted) return;
    setAl2Selections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const handleAl2Submit = () => {
    setAl2Submitted(true);
  };

  // --- Auto-scroll Effects ---
  
  // Scroll to Text Section 1 when Question 1 is answered
  useEffect(() => {
    if (al1Response && textSection1Ref.current) {
      setTimeout(() => {
        textSection1Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [al1Response]);

  // Scroll to Feedback Section when Question 2 is submitted
  useEffect(() => {
    if (al2Submitted && feedbackSection2Ref.current) {
      setTimeout(() => {
        feedbackSection2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [al2Submitted]);

  // Scroll to bottom when "Next Lesson" appears
  useEffect(() => {
    if (review2Response !== null && bottomRef.current) {
      setTimeout(() => bottomRef.current.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }, [review2Response]);

  return (
    // Full screen on mobile (p-0), padded on desktop (md:p-8)
    <div className="min-h-screen font-sans text-white p-0 md:p-8 flex justify-center items-start" style={{ backgroundColor: COLORS.graphite }}>
      
      {/* Main Container "Pop-up" Card */}
      {/* Square corners on mobile (rounded-none), rounded on desktop */}
      <div className="w-full max-w-2xl min-h-screen md:min-h-0 rounded-none md:rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up relative" style={{ backgroundColor: COLORS.grey }}>
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-black/20 z-20">
          <div 
            className="h-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              backgroundColor: COLORS.neonTeal,
              boxShadow: `0 0 10px ${COLORS.neonTeal}`
            }}
          />
        </div>

        {/* Header - H1 Size */}
        <header className="p-6 md:p-8 pb-4 mt-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 leading-tight" style={{ color: COLORS.neonTeal }}>
            Introducing Independent <br/>
            <span style={{ color: 'white' }}>And Critical Thinking</span>
          </h1>
          <div className="h-2 w-32 rounded mt-6" style={{ backgroundColor: COLORS.orange }}></div>
        </header>

        {/* Video Section - 9:16 Aspect Ratio */}
        <section className="px-6 md:px-8 py-6 flex flex-col items-center">
          <div className="aspect-[9/16] w-full max-w-xs rounded-xl overflow-hidden bg-black shadow-lg border border-white/10 relative">
            <iframe 
              className="w-full h-full"
              src="https://drive.google.com/file/d/136mOSiGLAGqqenq2rPDV68wPrEuxjCWD/preview"
              title="Smoke Filled Room Experiment"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Content Flow */}
        <div className="px-6 md:px-8 py-8 space-y-12 md:space-y-16">

          {/* Question 1 - H2 Size */}
          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1.5 flex-shrink-0">
                <HelpCircle size={32} style={{ color: COLORS.neonTeal }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Question 1</h2>
            </div>
            
            {/* Paragraph - H3 Tag */}
            <h3 className="text-2xl md:text-3xl leading-relaxed text-gray-200 font-normal">
              If you were the student in the video, would you report the smoke or continue taking the survey?
            </h3>

            <div className="grid grid-cols-1 gap-4 mt-6">
              <button 
                onClick={() => setAl1Response('report')}
                className={`p-6 rounded-xl border-2 text-left transition-all ${al1Response === 'report' ? 'border-transparent ring-2 ring-offset-2 ring-offset-[#303030]' : 'border-white/10 hover:border-white/30'}`}
                style={{ 
                  backgroundColor: al1Response === 'report' ? COLORS.neonTeal : 'transparent',
                  color: al1Response === 'report' ? COLORS.graphite : 'white',
                  borderColor: al1Response === 'report' ? COLORS.neonTeal : undefined
                }}
              >
                <div className="text-2xl md:text-3xl font-bold mb-1">A.</div>
                <div className="text-2xl md:text-3xl">Report the smoke</div>
              </button>
              <button 
                onClick={() => setAl1Response('continue')}
                className={`p-6 rounded-xl border-2 text-left transition-all ${al1Response === 'continue' ? 'border-transparent ring-2 ring-offset-2 ring-offset-[#303030]' : 'border-white/10 hover:border-white/30'}`}
                style={{ 
                  backgroundColor: al1Response === 'continue' ? COLORS.neonTeal : 'transparent',
                  color: al1Response === 'continue' ? COLORS.graphite : 'white',
                  borderColor: al1Response === 'continue' ? COLORS.neonTeal : undefined
                }}
              >
                <div className="text-2xl md:text-3xl font-bold mb-1">B.</div>
                <div className="text-2xl md:text-3xl">Continue taking the survey</div>
              </button>
            </div>
          </section>

          {/* Textual Section 1 */}
          {al1Response && (
            <section 
              ref={textSection1Ref}
              className="animate-fade-in space-y-8 bg-black/20 p-6 md:p-8 rounded-2xl border-l-8" 
              style={{ borderColor: COLORS.orange }}
            >
              <h3 className="font-bold text-2xl md:text-3xl">
                Don’t be surprised, but the actual answer isn’t so simple.
              </h3>
              
              <h3 className="leading-relaxed opacity-90 text-2xl md:text-3xl font-normal">
                According to a famous study known as the Smoke Filled Room Experiment, your response would depend on a) whether or not you are alone in the room and b) assuming you’re not alone, whether or not the other participants are also wondering what to do.
              </h3>
              
              <div className="space-y-4 pl-2 md:pl-4 text-2xl md:text-3xl">
                <h3 className="text-lg md:text-xl uppercase tracking-wider font-bold" style={{ color: COLORS.mutedTeal }}>In the original experiment:</h3>
                <ul className="list-disc pl-6 space-y-3 opacity-90">
                  <li><h3 className="font-normal text-2xl md:text-3xl">When alone in the room, 75% of participants reported smoke</h3></li>
                  <li><h3 className="font-normal text-2xl md:text-3xl">When seated with two other participants, 38% reported smoke</h3></li>
                  <li><h3 className="font-normal text-2xl md:text-3xl">When seated with two people the researchers instructed not to respond, only 10% reported smoke</h3></li>
                </ul>
              </div>

              <h3 className="leading-relaxed opacity-90 text-2xl md:text-3xl font-normal">
                Those findings demonstrate that most people need social proof, they look to others when deciding how to interpret a situation; and that leads to a diffusion of responsibility, meaning they won’t act before someone else does (also called “Bystander Effect”).
              </h3>
              <h3 className="font-bold text-2xl md:text-3xl" style={{ color: COLORS.orange }}>
                That doesn’t bode well for independent thinking.
              </h3>
              <h3 className="leading-relaxed opacity-90 text-2xl md:text-3xl font-normal">
                Independent thinking is the ability to form your own ideas as opposed to adopting the views of others, and, as you will learn later in this unit, is intrinsic to living a Jewish life.
              </h3>
            </section>
          )}

          {/* Question 2 - H2 Size */}
          {al1Response && (
            <section className="space-y-6 pt-6 border-t border-white/10 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="mt-1.5 flex-shrink-0">
                  <HelpCircle size={32} style={{ color: COLORS.neonTeal }} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Question 2</h2>
              </div>
              
              <h3 className="text-2xl md:text-3xl leading-relaxed text-gray-200 font-normal">
                Even if you’re an independent thinker, how do you know you’re right? <br/>
                <span className="text-xl opacity-60 font-normal block mt-2">[Choose all that apply]</span>
              </h3>

              <div className="space-y-4 mt-6">
                {[
                  "You look for evidence before making a decision",
                  "You test your ideas by asking, “What else could be an explanation?”",
                  "You consider whether your answer fits the situation",
                  "You assume you’re right because you don’t follow the crowd"
                ].map((option, idx) => {
                  const isCorrectOption = idx !== 3; 
                  const isSelected = al2Selections.includes(idx);
                  
                  let containerStyle = "bg-transparent border border-white/10 hover:border-white/30";
                  let iconColor = COLORS.neonTeal;
                  let iconBg = isSelected ? COLORS.neonTeal : 'transparent';
                  let iconBorder = isSelected ? 'border-transparent' : 'border-white/40';

                  if (al2Submitted) {
                    if (isCorrectOption) {
                      if (isSelected) {
                        containerStyle = "bg-green-500/10 border-green-500 text-green-100";
                        iconBg = COLORS.green;
                        iconBorder = 'border-transparent';
                        iconColor = COLORS.graphite;
                      } else {
                        containerStyle = "bg-transparent border-green-500/50 opacity-70"; 
                      }
                    } else {
                      if (isSelected) {
                        containerStyle = "bg-red-500/10 border-red-500 text-red-100";
                        iconBg = COLORS.red;
                        iconBorder = 'border-transparent';
                        iconColor = 'white';
                      } else {
                         containerStyle = "bg-transparent border-white/10 opacity-40";
                      }
                    }
                  } else if (isSelected) {
                    containerStyle = "bg-white/10 border-white/30";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAl2Toggle(idx)}
                      disabled={al2Submitted}
                      className={`w-full p-5 rounded-xl flex items-start gap-5 transition-all text-left ${containerStyle}`}
                    >
                      <div className={`w-8 h-8 rounded border flex items-center justify-center transition-colors flex-shrink-0 mt-1 ${iconBorder}`} style={{ backgroundColor: iconBg }}>
                        {isSelected && (
                          al2Submitted ? (
                             isCorrectOption ? <Check size={20} color={COLORS.graphite} strokeWidth={3} /> : <X size={20} color="white" strokeWidth={3} />
                          ) : (
                             <Check size={20} color={COLORS.graphite} strokeWidth={3} />
                          )
                        )}
                      </div>
                      <span className="flex-1 text-2xl md:text-3xl">{option}</span>
                      {al2Submitted && isCorrectOption && isSelected && <span className="text-lg font-bold text-green-400 flex-shrink-0 mt-1">GOOD</span>}
                      {al2Submitted && !isCorrectOption && isSelected && <span className="text-lg font-bold text-red-400 flex-shrink-0 mt-1">OPS</span>}
                    </button>
                  );
                })}
              </div>

              {!al2Submitted ? (
                <button 
                  onClick={handleAl2Submit}
                  disabled={al2Selections.length === 0}
                  className="w-full px-8 py-5 rounded-full font-bold text-2xl mt-6 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  style={{ backgroundColor: COLORS.orange, color: 'white' }}
                >
                  Check Answers
                </button>
              ) : (
                <div ref={feedbackSection2Ref} className="mt-8 animate-fade-in">
                  <div className="bg-black/20 p-6 md:p-8 rounded-2xl border-l-8 space-y-6" style={{ borderColor: COLORS.neonTeal }}>
                    <h3 className="font-bold text-2xl md:text-3xl">
                      If you chose answers A, B, or C, you’re on the right track, as opposed to D, which is maybe just a testament to your rebellious nature (not necessarily a bad thing, but also not necessarily an indicator of truthfulness).
                    </h3>
                    <h3 className="leading-relaxed opacity-90 text-2xl md:text-3xl font-normal">
                      The point here is that in addition to being an independent thinker, you also want to be a critical thinker.
                    </h3>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="font-bold mb-3 text-2xl md:text-3xl" style={{ color: COLORS.mutedTeal }}>Critical Thinking</h3>
                      <h3 className="text-2xl md:text-3xl opacity-80 font-normal">
                        The ability to analyze ideas, claims, and information; to evaluate evidence, spot assumptions, and test logic. You judge the veracity of whatever it is you’re examining.
                      </h3>
                    </div>
                    <h3 className="leading-relaxed opacity-90 text-2xl md:text-3xl font-normal">
                      With that in mind, in this unit, you will learn that, as a Jew, you are expected to be both an independent and critical thinker. That means:
                    </h3>
                    <ul className="list-disc pl-6 space-y-3 opacity-90 text-2xl md:text-3xl">
                      <li><h3 className="font-normal text-2xl md:text-3xl">Being comfortable asking uncomfortable questions</h3></li>
                      <li><h3 className="font-normal text-2xl md:text-3xl">Being independent-minded</h3></li>
                      <li><h3 className="font-normal text-2xl md:text-3xl">Gathering evidence, taking logical steps, and coming to conclusions on your own</h3></li>
                    </ul>
                  </div>
                  
                  <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5">
                     <h3 className="mb-6 text-2xl md:text-3xl font-normal">
                       Both independent and critical thinking have starring roles in Jewish scholarship and tradition, and in this unit you will discover that those ways of thinking are:
                     </h3>
                     <ul className="space-y-4 text-2xl md:text-3xl opacity-80">
                        {[
                          "The point of the first of the Ten Commandments",
                          "Taken as a given when Jewish ideas are taught and explained",
                          "Taught to Jewish children at an early age",
                          "Incorporated into Jewish holiday observance and customs",
                          "An important part of living a Jewish life"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                             <div className="mt-3 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.orange }} />
                             <h3 className="font-normal text-2xl md:text-3xl">{item}</h3>
                          </li>
                        ))}
                     </ul>
                     <div className="mt-8 flex items-start gap-4 p-6 bg-[#1B1B1B] rounded-xl border border-white/10">
                        <Info className="flex-shrink-0 mt-1" size={32} color={COLORS.neonTeal} />
                        <h3 className="text-2xl md:text-3xl italic text-gray-300 font-normal">
                          In the next lessons, you will explore the ideas of social conditioning, leaps of faith, belief, knowledge, and what — within the context of being an independent and critical thinker — is considered the foundation for Jewish thought.
                        </h3>
                     </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Review Questions - H2 Size */}
          {al2Submitted && (
            <section className="pt-10 border-t border-white/10 animate-fade-in pb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: COLORS.neonTeal }}>Review Questions</h2>
              
              {/* Question 1 */}
              <div className="mb-12">
                <h3 className="font-bold mb-6 text-2xl md:text-3xl">
                  <span className="opacity-50 mr-3">Q1:</span>
                  True or False: Following the crowd can sometimes prevent independent thinking because you may rely on others to interpret a situation instead of forming your own view.
                </h3>
                <div className="flex flex-col gap-4">
                  {['True', 'False'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setReview1Response(opt === 'True')}
                      disabled={review1Response !== null}
                      className={`px-8 py-5 text-2xl md:text-3xl rounded-xl font-medium border-2 transition-all
                        ${review1Response === null 
                          ? 'border-white/20 hover:border-white/50 bg-transparent' 
                          : (opt === 'True' && review1Response === true) || (opt === 'True' && review1Response === false) // Correct answer is True
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : (review1Response !== null && opt !== 'True')
                              ? 'opacity-50 border-transparent'
                              : ''
                        }
                      `}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {review1Response !== null && (
                  <div className={`mt-4 p-5 rounded-xl text-2xl md:text-3xl flex items-center gap-4 ${review1Response ? 'bg-green-900/30 text-green-300' : 'bg-green-900/30 text-green-300'}`}>
                    {review1Response 
                      ? "Yes, that’s true. Following the crowd could be an impediment to independent thought." 
                      : "Nope, it’s true. Following the crowd could be an impediment to independent thought."
                    }
                  </div>
                )}
              </div>

              {/* Question 2 */}
              <div className="mb-6">
                <h3 className="font-bold mb-6 text-2xl md:text-3xl">
                  <span className="opacity-50 mr-3">Q2:</span>
                  You come up with a strong initial explanation for why something happened, but you want to avoid jumping to conclusions. What’s the best way to think more critically about it?
                </h3>
                <div className="space-y-4">
                  {[
                    "Ask yourself what assumptions you’re making and whether the evidence actually supports them",
                    "Stick with your first explanation because it “feels right”",
                    "Look for someone else’s opinion and use that as your guide",
                    "Dismiss alternative explanations so you don’t get confused"
                  ].map((option, idx) => {
                    const isSelected = review2Response === idx;
                    const isCorrect = idx === 0;
                    const showResult = review2Response !== null;

                    let btnStyle = "border-white/10 hover:bg-white/5";
                    if (showResult) {
                      if (isCorrect) btnStyle = "border-green-500 bg-green-500/10 text-green-300";
                      else if (isSelected && !isCorrect) btnStyle = "border-red-500 bg-red-500/10 text-red-300";
                      else btnStyle = "border-transparent opacity-40";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setReview2Response(idx)}
                        disabled={review2Response !== null}
                        className={`w-full p-6 text-left rounded-xl border-2 transition-all flex items-start gap-4 ${btnStyle}`}
                      >
                        <span className="font-bold opacity-50 text-2xl md:text-3xl mt-0.5">{String.fromCharCode(65 + idx)}.</span>
                        <span className="text-2xl md:text-3xl">{option}</span>
                      </button>
                    );
                  })}
                </div>
                {review2Response !== null && (
                  <div className={`mt-6 p-6 rounded-xl flex gap-4 ${review2Response === 0 ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
                     {review2Response === 0 
                       ? <Check className="text-green-400 flex-shrink-0" size={32} />
                       : <X className="text-red-400 flex-shrink-0" size={32} />
                     }
                     <p className="text-2xl md:text-3xl">
                       {review2Response === 0
                         ? "Excellent! Look at your assumptions and see if the evidence supports them."
                         : "Close, the correct answer is A. Ask yourself what assumptions you’re making and whether the evidence actually supports them."
                       }
                     </p>
                  </div>
                )}
              </div>
              
              {/* Next Lesson Button */}
              {review2Response !== null && (
                <div className="mt-12 flex justify-center animate-fade-in-up" ref={bottomRef}>
                   <button className="group relative px-10 py-6 rounded-full font-bold text-2xl md:text-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-4 overflow-hidden" 
                           style={{ backgroundColor: COLORS.neonTeal, color: COLORS.graphite }}>
                      <span className="relative z-10">Next Lesson</span>
                      <ArrowRight size={28} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                   </button>
                </div>
              )}

            </section>
          )}

        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;