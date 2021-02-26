class Solution {
    public int lengthOfLongestSubstring(String str) {
        int n=str.length();
        HashMap<Character,Integer>map=new HashMap<>();
        int max=0;
        int c=0;
        str=str.toLowerCase();
        for(int i=0;i<n;i++){
            char ch=str.charAt(i);

            int a=ch-'a';
            if(map.containsKey(ch)){
                map=new HashMap<>();
                map.put(ch,1);
                max=Math.max(max,c);
                c=1;
            }
            else{
                map.put(ch,1);
                c++;
            }
        }
        max=Math.max(max,c);

        c=0;
        map=new HashMap<>();
        for(int i=n-1;i>=0;i--){
            char ch=str.charAt(i);

            int a=ch-'a';
            if(map.containsKey(ch)){
                map=new HashMap<>();
                map.put(ch,1);
                max=Math.max(max,c);
                c=1;
            }
            else{
                map.put(ch,1);
                c++;
            }
        }
        max=Math.max(max,c);

        return max;
    }
}