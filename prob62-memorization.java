class Solution {
    public int uniquePaths(int m, int n) {
        boolean [][]arr=new boolean[m][n];
        int[][]dp=new int[m][n];
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                dp[i][j]=-1;
            }
        }
        return sol(0,0,m-1,n-1,arr,dp);
    }
    public int sol(int sr,int sc,int er,int ec,boolean [][]arr,int[][]dp){
       if(sr==er && sc==ec){
           return 1;
       }
        if(sr<0 || sc<0 || sr>er || sc>ec || arr[sr][sc]){
            return 0;
        }
        arr[sr][sc]=true;
        if(dp[sr][sc]!=-1)
            return dp[sr][sc];
        
        int res=0;
        res+=sol(sr+1,sc,er,ec,arr,dp);
        res+=sol(sr,sc+1,er,ec,arr,dp);
        
        arr[sr][sc]=false;
        return dp[sr][sc]=res;
    }
}