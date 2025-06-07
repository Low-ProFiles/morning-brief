// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Firebase Admin SDK 초기화
// Functions 환경에서는 별도의 config 없이 자동으로 초기화됩니다.
admin.initializeApp();

// Firestore DB 인스턴스 가져오기
const db = admin.firestore();

// 새로운 사용자가 생성될 때 트리거되는 함수
export const createFirestoreUserDocument = functions.auth.user().onCreate(async (user) => {
  // 새로 생성된 사용자 정보 가져오기
  const uid = user.uid;
  const email = user.email;
  const displayName = user.displayName;
  const photoURL = user.photoURL;
  const creationTime = user.metadata.creationTime; // 최초 생성 시간
  const lastSignInTime = user.metadata.lastSignInTime; // 마지막 로그인 시간

  // Firestore에 저장할 사용자 데이터 객체
  const userData = {
    uid: uid,
    email: email,
    displayName: displayName || '익명 사용자', // Google 로그인 시 displayName, photoURL 제공됨
    photoURL: photoURL || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(), // 서버 시간으로 타임스탬프 기록
    lastSignedInAt: admin.firestore.FieldValue.serverTimestamp(), // 서버 시간으로 타임스탬프 기록
    // 기타 필요한 정보 추가 가능 (예: roles, settings 등)
  };

  try {
    // 'users' 컬렉션에 사용자의 UID를 문서 ID로 하여 데이터 저장
    await db.collection('users').doc(uid).set(userData, { merge: true }); // merge: true로 기존 필드는 유지하고 추가/업데이트

    console.log(`User document created for uid: ${uid}`);
    return null; // 성공 시 null 반환
  } catch (error) {
    console.error(`Error creating user document for uid: ${uid}`, error);
    // 에러 발생 시 Functions 로그에 기록
    return null; // 에러 발생 시에도 null 반환 (onCreate 트리거 함수의 약속)
  }
});

// 참고: 사용자가 로그인할 때마다 마지막 로그인 시간을 업데이트하려면
// onSignIn 함수를 추가로 만들 수 있습니다 (Auth 트리거는 onCreate/onDelete만 제공).
// onSignIn은 클라이언트에서 로그인 성공 후 직접 호출하거나 (보안 고려 필요),
// 또는 특정 DB 읽기/쓰기 시 검증 함수(Callable Function)에서 처리할 수도 있습니다.
/*
// 예시: Callable Function (클라이언트에서 호출)
export const updateLastSignInTime = functions.https.onCall(async (data, context) => {
  // 호출한 사용자가 인증되었는지 확인
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const uid = context.auth.uid;

  try {
    await db.collection('users').doc(uid).update({
      lastSignedInAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`Last sign-in time updated for uid: ${uid}`);
    return { status: 'success' };
  } catch (error) {
    console.error(`Error updating last sign-in time for uid: ${uid}`, error);
    throw new functions.https.HttpsError('internal', 'Unable to update last sign-in time.', error);
  }
});
*/
