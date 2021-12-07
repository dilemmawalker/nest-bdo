class Solution {
    public int numSubseq(int[] arr, int tar) {
        long c=0l;
        int n=arr.length;
        int p1=0;
        Arrays.sort(arr);
        int mod=(int)(Math.pow(10,9))+7;
        for(int i=0;i<n;i++){
            int a=arr[i];
            if(a+a<=tar){
                c++;
                c=(c)%mod;
            }
        }
        int m=(int)Math.pow(10,5)+1;
        int[]valarr=new int[m];
        int temp=1;
        for(int i=0;i<m;i++){
            valarr[i]=temp;
            temp=(temp*2)%mod;
        }
        
        // System.out.println(c);
        int p2=n-1;
        while(p1<p2){
            int a=arr[p1];
            int b=arr[p2];
            if(a+b<=tar){
                int val=p2-p1;
                // long imp_value=fun(2,val,mod);
                long imp_value=valarr[val];
                c=(long)(c*1l+((imp_value*1l-1 +mod)%mod +mod)%mod + mod)%mod;
                // c+=(int)Math.pow(2,val);
                // System.out.println(c);
                c=(c+mod)%mod;
                p1++;
            }
            else{
                p2--;
            }
        }
        return (int)(c+mod)%mod;
    }
    public long fun(int a, int val,int mod){  //very nice function, not needed though🥲
        long ans=1;
        while(val>0){
            if(a%2!=0){
                val/=2;
                a=(a*a)%mod;
            }
            else{
                val--;
                ans=(ans*a)%mod;
            }
        }
        return ans%mod;
    }
}