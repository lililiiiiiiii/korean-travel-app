import React, { useState, useEffect } from 'react';

// 📚 韓國旅遊高頻精選詞彙庫 (餐廳、市場、計程車、交通、常用、應急)
const INITIAL_VOCAB = [
  // 🍱 餐廳/點餐 (Dining)
  { id: 1, category: 'dining', kr: '여기요!', zh: '不好意思 / 老闆！（餐廳呼叫）', romaja: 'Yeo-gi-yo!' },
  { id: 2, category: 'dining', kr: '이거 주세요.', zh: '請給我這個 (指菜單)', romaja: 'I-geo ju-se-yo.' },
  { id: 3, category: 'dining', kr: '물 좀 주세요.', zh: '請給我水', romaja: 'Mul jom ju-se-yo.' },
  { id: 4, category: 'dining', kr: '덜 맵게 해주세요.', zh: '請做不那麼辣 (少辣)', romaja: 'Deol maep-ge hae-ju-se-yo.' },
  { id: 5, category: 'dining', kr: '고수 넣지 마세요.', zh: '請不要加香菜', romaja: 'Go-su neoch-ji ma-se-yo.' },
  { id: 6, category: 'dining', kr: '반찬 더 주세요.', zh: '請再給我一點小菜', romaja: 'Ban-chan deo ju-se-yo.' },
  { id: 7, category: 'dining', kr: '포장해 주세요.', zh: '請幫我打包', romaja: 'Po-jang-hae ju-se-yo.' },
  { id: 8, category: 'dining', kr: '계산해 주세요.', zh: '請幫我結帳', romaja: 'Gye-san-hae ju-se-yo.' },
  { id: 9, category: 'dining', kr: '따로 계산해 주세요.', zh: '請分開結帳', romaja: 'Tta-ro gye-san-hae ju-se-yo.' },

  // 🍢 傳統市場/購物 (Market & Shopping)
  { id: 10, category: 'market', kr: '얼마예요?', zh: '這個多少錢？', romaja: 'Eol-ma-ye-yo?' },
  { id: 11, category: 'market', kr: '이거 맛볼 수 있어요?', zh: '這個可以試吃嗎？', romaja: 'I-geo mat-bol su iss-eo-yo?' },
  { id: 12, category: 'market', kr: '깎아주세요.', zh: '算便宜一點啦～', romaja: 'Gkak-a-ju-se-yo.' },
  { id: 13, category: 'market', kr: '현금으로 하면 깎아주나요?', zh: '付現金有算便宜嗎？', romaja: 'Hyeon-geum-eu-ro ha-myeon gkak-a-ju-na-yo?' },
  { id: 14, category: 'market', kr: '봉투 주세요.', zh: '請給我袋子', romaja: 'Bong-tu ju-se-yo.' },
  { id: 15, category: 'market', kr: '카드 돼요?', zh: '可以刷卡嗎？', romaja: 'Ka-deu dwae-yo?' },
  { id: 16, category: 'market', kr: '택스 리펀 돼요?', zh: '可以退稅嗎？', romaja: 'Taek-seu ri-peon dwae-yo?' },

  // 🚕 計程車 (Taxi)
  { id: 17, category: 'taxi', kr: '이 주소로 가주세요.', zh: '請帶我去這個地址 (出示手機)', romaja: 'I ju-so-ro ga-ju-se-yo.' },
  { id: 18, category: 'taxi', kr: '트렁크 좀 열어주세요.', zh: '請幫我開後備箱 (放行李)', romaja: 'Teu-reong-keu jom yeol-eo-ju-se-yo.' },
  { id: 19, category: 'taxi', kr: '여기서 내려주세요.', zh: '請在這裡讓我下車', romaja: 'Yeo-gi-seo nae-ryeo-ju-se-yo.' },
  { id: 20, category: 'taxi', kr: '얼마나 걸려요?', zh: '大概需要多久時間？', romaja: 'Eol-ma-na geol-ryeo-yo?' },
  { id: 21, category: 'taxi', kr: '영수증 주세요.', zh: '請給我收據', romaja: 'Yeong-su-jeung ju-se-yo.' },

  // 🚇 交通/問路 (Transport)
  { id: 22, category: 'transport', kr: '화장실이 어디예요?', zh: '洗手間在哪裡？', romaja: 'Hwa-jang-sil-i eo-di-ye-yo?' },
  { id: 23, category: 'transport', kr: '지하철역이 어디예요?', zh: '地鐵站在哪裡？', romaja: 'Ji-ha-cheol-yeok-i eo-di-ye-yo?' },
  { id: 24, category: 'transport', kr: '티머니 충전해 주세요.', zh: '請幫我的 T-Money 卡加值', romaja: 'T-money chung-jeon-hae ju-se-yo.' },
  { id: 25, category: 'transport', kr: '이 버스 홍대로 가나요?', zh: '這公車有去弘大嗎？', romaja: 'I beo-seu Hong-dae-ro ga-na-yo?' },

  // 👋 常用/應急 (Basic & Emergency)
  { id: 26, category: 'basic', kr: '안녕하세요.', zh: '你好', romaja: 'An-nyeong-ha-se-yo.' },
  { id: 27, category: 'basic', kr: '감사합니다.', zh: '謝謝', romaja: 'Gam-sa-ham-ni-da.' },
  { id: 28, category: 'basic', kr: '죄송합니다.', zh: '對不起 / 不好意思', romaja: 'Jwe-song-ham-ni-da.' },
  { id: 29, category: 'basic', kr: '괜찮아요.', zh: '沒關係 / 不用了', romaja: 'Gwaen-chan-a-yo.' },
  { id: 30, category: 'basic', kr: '와이파이 비밀번호가 뭐예요?', zh: 'WiFi 密碼是什麼？', romaja: 'Wi-fi bi-mil-beon-ho-ga meoe-ye-yo?' },
  { id: 31, category: 'emergency', kr: '도와주세요!', zh: '請幫幫我！', romaja: 'Do-wa-ju-se-yo!' },
  { id: 32, category: 'emergency', kr: '약국이 어디예요?', zh: '藥局在哪裡？', romaja: 'Yak-guk-i eo-di-ye-yo?' }
];

const CATEGORIES = [
  { id: 'ALL', name: '✨ 全部' },
  { id: 'dining', name: '🍱 餐廳/點餐' },
  { id: 'market', name: '🍢 傳統市場' },
  { id: 'taxi', name: '🚕 計程車' },
  { id: 'transport', name: '🚇 交通/問路' },
  { id: 'basic', name: '👋 常用' },
  { id: 'emergency', name: '🆘 應急' },
];

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('kr_travel_vocab_v3');
    return saved ? JSON.parse(saved) : INITIAL_VOCAB;
  });

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [fullscreenCard, setFullscreenCard] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showManageMenu, setShowManageMenu] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const [newKr, setNewKr] = useState('');
  const [newZh, setNewZh] = useState('');
  const [newCategory, setNewCategory] = useState('dining');

  useEffect(() => {
    localStorage.setItem('kr_travel_vocab_v3', JSON.stringify(items));
  }, [items]);

  // 🔊 手機相容性優化發音引擎
  const playAudio = (text) => {
    if (!text) return;
    const cleanText = text.trim();

    // 1. 優先使用裝置內建原生 TTS (Web Speech API)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;

      window.speechSynthesis.speak(utterance);

      // 檢查是否順利發聲，若無則啟動備援 MP3 流
      setTimeout(() => {
        if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
          fallbackAudioStream(cleanText);
        }
      }, 400);
    } else {
      fallbackAudioStream(cleanText);
    }
  };

  const fallbackAudioStream = (cleanText) => {
    const audioUrl = `https://dict.youdao.com/dictvoice?type=0&le=ko&audio=${encodeURIComponent(cleanText)}`;
    const audio = new Audio(audioUrl);
    audio.play().catch((err) => console.log('Audio playback prevented:', err));
  };

  // ⚙️ 恢復預設詞彙 (保留自訂項)
  const handleResetToDefault = () => {
    if (window.confirm('確定要恢復預設單字庫嗎？(您自行新增的短語將會保留)')) {
      const userCustomItems = items.filter((item) => item.isCustom);
      const existingKrs = new Set(userCustomItems.map((i) => i.kr));
      const missingDefaults = INITIAL_VOCAB.filter((defItem) => !existingKrs.has(defItem.kr));

      setItems([...userCustomItems, ...missingDefaults]);
      setShowManageMenu(false);
    }
  };

  // 🗑️ 清空全部
  const handleClearAll = () => {
    if (window.confirm('確定要清空所有內容嗎？')) {
      setItems([]);
      setShowManageMenu(false);
    }
  };

  // ➕ 新增短語：支援自動翻譯
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newZh.trim()) return;

    let translatedKr = newKr.trim();

    // 如果使用者沒有輸入韓文，自動呼叫免費 MyMemory API 進行翻譯
    if (!translatedKr) {
      try {
        setIsTranslating(true);
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(newZh.trim())}&langpair=zh-TW|ko`
        );
        const data = await res.json();
        
        if (data.responseData && data.responseData.translatedText) {
          translatedKr = data.responseData.translatedText;
        } else {
          alert('自動翻譯失敗，請手動輸入韓文');
          setIsTranslating(false);
          return;
        }
      } catch (error) {
        console.error('Translation error:', error);
        alert('翻譯服務連線失敗，請手動輸入韓文');
        setIsTranslating(false);
        return;
      } finally {
        setIsTranslating(false);
      }
    }

    const newItem = {
      id: Date.now(),
      category: newCategory,
      kr: translatedKr,
      zh: newZh.trim(),
      romaja: 'Auto-translated',
      isCustom: true
    };

    setItems([newItem, ...items]);
    setNewKr('');
    setNewZh('');
    setShowAddForm(false);
  };

  // 🗑️ 刪除單項
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 過濾邏輯
  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesQuery =
      item.kr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.zh.includes(searchQuery) ||
      (item.romaja && item.romaja.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  // 韓文組合字轉羅馬拼音的簡易轉換器
  const getRomaja = (text) => {
    if (!text) return '';
    // 如果包含了自訂標記，不顯示 Auto-translated，直接留空或保留原文
    return ''; 
  };


  return (
    <div style={styles.appContainer}>
      <main style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerTop}>
            <div style={styles.brandGroup}>
              <span style={styles.flagIcon}>🇰🇷</span>
              <div>
                <h1 style={styles.brandTitle}>韓國旅遊隨身冊</h1>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => { setShowAddForm(!showAddForm); setShowManageMenu(false); }}
                style={showAddForm ? styles.addToggleActiveBtn : styles.addToggleBtn}
              >
                {showAddForm ? '關閉' : '➕ 新增'}
              </button>
              <button
                onClick={() => { setShowManageMenu(!showManageMenu); setShowAddForm(false); }}
                style={styles.manageToggleBtn}
              >
                ⚙️
              </button>
            </div>
          </div>

          {/* ⚙️ 管理面板 */}
          {showManageMenu && (
            <div style={styles.managePanel}>
              <button onClick={handleResetToDefault} style={styles.resetBtn}>
                🔄 恢復預設詞彙
              </button>
              <button onClick={handleClearAll} style={styles.clearBtn}>
                🗑️ 清空所有內容
              </button>
            </div>
          )}

          {/* 搜尋框 */}
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="🔍 搜尋韓文、中文、拼音"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* 分類 Chips */}
          <div style={styles.categoryBar}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={selectedCategory === cat.id ? styles.categoryActiveBtn : styles.categoryBtn}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </header>

        {/* ➕ 新增短語表單 (支援中文自動翻譯) */}
        {showAddForm && (
          <form onSubmit={handleAddItem} style={styles.addForm}>
            <h3 style={styles.formTitle}>新增自訂短語 (輸入中文可自動翻譯)</h3>
            <input
              type="text"
              placeholder="中文翻譯 (例: 請幫我微波這個) *"
              value={newZh}
              onChange={(e) => setNewZh(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="韓文 (留空將自動翻譯中文)"
              value={newKr}
              onChange={(e) => setNewKr(e.target.value)}
              style={styles.input}
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={styles.select}
            >
              <option value="dining">🍱 餐廳/點餐</option>
              <option value="market">🍢 傳統市場</option>
              <option value="taxi">🚕 計程車</option>
              <option value="transport">🚇 交通/問路</option>
              <option value="basic">👋 常用</option>
              <option value="emergency">🆘 應急</option>
            </select>
            <button type="submit" style={styles.submitBtn} disabled={isTranslating}>
              {isTranslating ? '⏳ 正在自動翻譯中...' : '✨ 自動翻譯並儲存'}
            </button>
          </form>
        )}

        {/* 詞彙卡片列表 */}
        <section style={styles.listSection}>
          {filteredItems.length === 0 ? (
            <div style={styles.emptyCard}>
              <p style={styles.emptyText}>未找到相關單字或句子</p>
              <button onClick={handleResetToDefault} style={styles.resetInlineBtn}>恢復預設詞彙</button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.cardMain}>
                  <div style={styles.krText}>
                    {item.kr}
                    {item.isCustom && <span style={styles.customBadge}>自訂</span>}
                  </div>
                  {item.romaja && item.romaja !== 'Auto-translated' && (<div style={styles.romajaText}>{item.romaja}</div>)}
                  <div style={styles.zhText}>{item.zh}</div>
                </div>

                <div style={styles.cardActions}>
                  <button onClick={() => playAudio(item.kr)} style={styles.actionBtn} title="播放發音">
                    🔊
                  </button>
                  <button onClick={() => setFullscreenCard(item)} style={styles.showClerkBtn} title="示店員大字">
                    📱 示店員
                  </button>
                  <button onClick={() => handleDeleteItem(item.id)} style={styles.deleteBtn} title="刪除">
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* 📱 示店員大字 Mode (全屏高對比模式) */}
        {fullscreenCard && (
          <div style={styles.modalOverlay} onClick={() => setFullscreenCard(null)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalBadge}>💡 直接出示給韓國店員 / 司機看</div>
              <div style={styles.bigKrBox}>
                <span style={styles.bigKrText}>{fullscreenCard.kr}</span>
              </div>
              <div style={styles.bigZhText}>{fullscreenCard.zh}</div>

              <div style={styles.modalActions}>
                <button onClick={() => playAudio(fullscreenCard.kr)} style={styles.modalAudioBtn}>
                  🔊 播放發音
                </button>
                <button onClick={() => setFullscreenCard(null)} style={styles.modalCloseBtn}>
                  關閉
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// 🎨 韓系簡約極致 UI 樣式系統
const styles = {
  appContainer: {
    backgroundColor: '#F9F8F6',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1C1C1E'
  },
  mainContent: {
    width: '100%',
    maxWidth: '460px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: '#FFFFFF',
    padding: '18px',
    borderRadius: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    border: '1px solid #F0ECE1'
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brandGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  flagIcon: {
    fontSize: '28px'
  },
  brandTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#1C1C1E',
    margin: 0,
    letterSpacing: '-0.3px'
  },
  brandSubtitle: {
    fontSize: '11px',
    color: '#8E8E93',
    margin: 0,
    fontWeight: '500'
  },
  addToggleBtn: {
    border: 'none',
    backgroundColor: '#F0ECE1',
    color: '#1C1C1E',
    fontWeight: '700',
    padding: '8px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s'
  },
  addToggleActiveBtn: {
    border: 'none',
    backgroundColor: '#1C1C1E',
    color: '#FFFFFF',
    fontWeight: '700',
    padding: '8px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  manageToggleBtn: {
    border: 'none',
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    fontWeight: '600',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  managePanel: {
    display: 'flex',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#F9F8F6',
    borderRadius: '14px'
  },
  resetBtn: {
    flex: 1,
    border: 'none',
    backgroundColor: '#E5E7EB',
    color: '#374151',
    fontWeight: '600',
    padding: '8px',
    borderRadius: '8px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  clearBtn: {
    flex: 1,
    border: 'none',
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    fontWeight: '600',
    padding: '8px',
    borderRadius: '8px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  searchWrapper: {
    width: '100%'
  },
  searchInput: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: '#F3F4F6',
    border: 'none',
    borderRadius: '14px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#1C1C1E'
  },
  categoryBar: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '2px',
    scrollbarWidth: 'none'
  },
  categoryBtn: {
    border: 'none',
    backgroundColor: '#F3F4F6',
    color: '#636366',
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    fontWeight: '500'
  },
  categoryActiveBtn: {
    border: 'none',
    backgroundColor: '#1C1C1E',
    color: '#FFFFFF',
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
  },
  addForm: {
    backgroundColor: '#FFFFFF',
    padding: '18px',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
    border: '1px solid #F0ECE1'
  },
  formTitle: {
    fontSize: '14px',
    fontWeight: '700',
    margin: '0 0 2px 0',
    color: '#1C1C1E'
  },
  input: {
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #E5E5EA',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#FAFAFA'
  },
  select: {
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #E5E5EA',
    fontSize: '14px',
    backgroundColor: '#FFF'
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#1C1C1E',
    color: '#FFF',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '4px'
  },
  listSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  emptyCard: {
    backgroundColor: '#FFF',
    borderRadius: '24px',
    padding: '36px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #F0ECE1'
  },
  emptyText: {
    margin: 0,
    color: '#8E8E93',
    fontSize: '14px'
  },
  resetInlineBtn: {
    border: 'none',
    backgroundColor: '#1C1C1E',
    color: '#FFF',
    padding: '10px 18px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '18px',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    border: '1px solid #F0ECE1'
  },
  cardMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    flex: 1
  },
  krText: {
    fontSize: '19px',
    fontWeight: '800',
    color: '#1C1C1E',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  customBadge: {
    fontSize: '10px',
    backgroundColor: '#E5E7EB',
    color: '#374151',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600'
  },
  romajaText: {
    fontSize: '12px',
    color: '#4A6FA5',
    fontWeight: '600'
  },
  zhText: {
    fontSize: '14px',
    color: '#636366',
    marginTop: '1px'
  },
  cardActions: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center'
  },
  actionBtn: {
    border: 'none',
    backgroundColor: '#F3F4F6',
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  showClerkBtn: {
    border: 'none',
    backgroundColor: '#FEF3C7',
    color: '#78350F',
    fontWeight: '700',
    padding: '8px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  deleteBtn: {
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px',
    opacity: 0.5
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.88)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: '28px',
    width: '100%',
    maxWidth: '400px',
    padding: '32px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
  },
  modalBadge: {
    fontSize: '12px',
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: '6px 12px',
    borderRadius: '20px',
    fontWeight: '700'
  },
  bigKrBox: {
    width: '100%',
    padding: '20px 10px',
    backgroundColor: '#FFFBEB',
    borderRadius: '20px',
    border: '2px dashed #FDE68A'
  },
  bigKrText: {
    fontSize: '34px',
    fontWeight: '900',
    color: '#1C1C1E',
    lineHeight: '1.25',
    wordBreak: 'break-word'
  },
  bigZhText: {
    fontSize: '18px',
    color: '#4B5563',
    fontWeight: '600'
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    marginTop: '8px'
  },
  modalAudioBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#1C1C1E',
    color: '#FFF',
    border: 'none',
    borderRadius: '14px',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer'
  },
  modalCloseBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#F3F4F6',
    color: '#374151',
    border: 'none',
    borderRadius: '14px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer'
  }
};
